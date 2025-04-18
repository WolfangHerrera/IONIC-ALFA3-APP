import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  galleryImages = [
    'https://http2.mlstatic.com/D_Q_NP_2X_923201-MCO83674092943_042025-E.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_951050-MCO83674317985_042025-E.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_941067-MCO83650418697_042025-E.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_694145-MCO83650438109_042025-AB.webp'
  ];
  currentImageIndex: number = 0;


  ignoreItem(item: { item_id: string }): boolean {
    const ignoredIds = ['EE4S1M', 'E4S1M'];
    return ignoredIds.includes(item.item_id);
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.galleryImages.length;
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
    this.getDataItemProduct();
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
      cssClass: 'no-padding-alert',
    });

    await alert.present();
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
      <ul>
        <li><strong>Metro cable: </strong>1 metro</li>
        <li><strong>Color: </strong>Negro</li>
        <li><strong>Dimesiónes: </strong> 20 x 4 x 6 cm</li>
        <li><strong>Peso: </strong>300 gr</li>
        <li><strong>Certificación: </strong>FFC</li>
        <li><strong>Voltaje: </strong>110 Voltios</li>
        <li><strong>Corriente: </strong>15 Amperios</li>
        <li><strong>Configuración: </strong>4 salidas</li>
      </ul>
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
