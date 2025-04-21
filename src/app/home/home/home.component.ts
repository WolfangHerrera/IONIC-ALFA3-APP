import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ModalController, ToastController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { ProductService } from 'src/app/services/products/request.service';
import { RequestService } from 'src/app/services/request/request.service';
import { typeHomeText, typeToastText } from 'src/app/utils/language/home/home/text';

@Component({
  selector: 'app-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements AfterViewInit {
  @Input() tabChanged: boolean = false;
  @ViewChild('customModalIMG', { static: true }) modal!: IonModal;
  @ViewChild('customModalIMG', { read: ElementRef }) customModalIMG?: ElementRef;
  selectedSegment: string = 'first';
  powerStrip = [];
  voltageRegulator = [];
  products = [];
  textHome!: typeHomeText;
  textToast!: typeToastText;
  textToastWholesale!: typeToastText;

  ignoreItem(item: { item_id: string }): boolean {
    const ignoredIds = ['EE4S1M', 'E4S1M'];
    return ignoredIds.includes(item.item_id);
  }

  constructor(
    private requestService: RequestService,
    private productService: ProductService,
    private toastController: ToastController,
    private alertController: AlertController,
    private languageService: LanguageService,
  ) {
    this.textHome = this.languageService.getTextHomeHome();
    this.textToast = this.languageService.getTextToast();
    this.textToastWholesale = this.languageService.getTextToastWholesale();
    this.getDataItemProduct();
  }

  async ngAfterViewInit() {
    await setTimeout(async () => {
       await this.showWelcomeMessage();
    }, 4000);
  }


  getDataItemProduct() {
    this.requestService.getItemProducts().subscribe((response) => {
      if (response) {
        this.products = response;
        this.productService.setDataProducts(this.products);
        this.voltageRegulator = this.products.filter(
          (item: { item_id: string }) => this.ignoreItem(item)
        );
        this.powerStrip = this.products.filter(
          (item: { item_id: string }) => !this.ignoreItem(item)
        );
      }
    });
  }

  async showWelcomeMessage() {
    const wholeSaleWhatsapp = localStorage.getItem('wholeSaleWhatsapp');
    if (wholeSaleWhatsapp === 'true') {
      return;
    }
    const alert = await this.alertController.create({
      header: this.textToastWholesale.header,
      subHeader: this.textToastWholesale.subHeader,
      message: `
      <ion-slides class="wrapper">
      <ion-slide>
      <img src="assets/icons/logo.png"/>
      </ion-slide>
      </ion-slides>
      `,
      buttons: [{
        text: this.textToastWholesale.buttonText || 'YES, OPEN WHATSAPP',
        handler: () => {
          this.wholeSaleWhatsapp('yes');
        },
      },{
        text: this.textToastWholesale.buttonText2 || 'NO, THANKS',
        handler: () => {
          this.wholeSaleWhatsapp();
        },
      }],
      cssClass: 'image-welcome-alert',
    });

    await alert.present();
  }

  async showImage(image: string) {
    const alert = await this.alertController.create({
      message: `
      <ion-slides class="wrapper">
        <ion-slide>
          <img src="${image}"/>
        </ion-slide>
      </ion-slides>
      `,
      cssClass: 'no-padding-image-alert',
    });

    await alert.present();
  }

  wholeSaleWhatsapp(choice = 'not') {
    localStorage.setItem('wholeSaleWhatsapp', 'true');
    if (choice === 'yes') {
      const message = encodeURIComponent('Hello, I am interested in buying wholesale.');
      window.open(`https://wa.me/573229873311?text=${message}`, '_blank');
    }
  }
  

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.getDataItemProduct();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async activateToast(text?: string) {
    let toast = await this.toastController.getTop();
    if (toast) {
      await toast.dismiss();
    }
    toast = await this.toastController.create({
      message: `${text} ${this.textToast.message}`,
      icon: 'cart-outline',
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture: 'vertical',
      position: 'top',
    });

    await toast.present();
  }

  async activateAlert(item_id: string) {
    const product = this.productService.getItemProducts(item_id);
    const alert = await this.alertController.create({
      header: `${product.item_name}`,
      subHeader: `PRECIO: $${this.setDotOnPrice(product.price)} COP`,
      message: `
      <div>
      <div><STRONG>METRO CABLE: </STRONG>1 METRO</div>
      <div><STRONG>COLOR: </STRONG>NEGRO</div>
      <div><STRONG>DIMENSIONES: </STRONG>20 X 4 X 6 CM</div>
      <div><STRONG>PESO: </STRONG>300 GR</div>
      <div><STRONG>CERTIFICACIÓN: </STRONG>FFC</div>
      <div><STRONG>VOLTAJE: </STRONG>110 VOLTIOS</div>
      <div><STRONG>CORRIENTE: </STRONG>15 AMPERIOS</div>
      <div><STRONG>CONFIGURACIÓN: </STRONG>4 SALIDAS</div>
      </div>
      `,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async onAddCart(item_id: string) {
    await this.productService.addItemToCart(item_id);
    const textToast = await this.productService.getItemProducts(item_id);
    await this.activateToast(textToast.item_name);
  }
}
