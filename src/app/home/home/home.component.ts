import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { HeaderService } from 'src/app/services/header/header.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { ProductService } from 'src/app/services/products/products.service';
import { RequestService } from 'src/app/services/request/request.service';
import { typeHomeText, typeToastText } from 'src/app/utils/language/home/home/text';

@Component({
  selector: 'app-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
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
    private readonly headerService: HeaderService
  ) {
    this.textHome = this.languageService.getTextHomeHome();
    this.textToast = this.languageService.getTextToast();
    this.getDataItemProduct();
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.buildHeader()
    }
  }

  async buildHeader() {
    this.headerService.setActivatedLeftButton(false);
    this.headerService.setLeftButton('Account');
    this.headerService.setActivatedRightButton(false);
    this.headerService.setRightButton('Cart');
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
  

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
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
      <div><STRONG>CABLE: </STRONG>1 METRO</div>
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
