import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/products/request.service';
import { RequestService } from 'src/app/services/request/request.service';


@Component({
  selector: 'app-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent  {
  selectedSegment: string = 'first';
  powerStrip = [];
  voltageRegulator = [];
  products = []

  ignoreItem(item: { item_id: string }): boolean {
    const ignoredIds = ['EE4S1M', 'E4S1M'];
    return ignoredIds.includes(item.item_id);
  }

constructor(private requestService: RequestService, private productService: ProductService, private toastController: ToastController, private alertController: AlertController) {
    this.getDataItemProduct()
  }


  getDataItemProduct() {
    this.requestService.getItemProducts().subscribe(
      (response) => {
        if (response) {
          this.products = response;
          this.productService.setDataProducts(this.products);
          this.voltageRegulator = this.products.filter((item: { item_id: string }) => this.ignoreItem(item));
          this.powerStrip = this.products.filter((item: { item_id: string }) => !this.ignoreItem(item));
        }
      },
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'ITEM ADDED TO CART!',
      icon: 'cart-outline',
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture:"vertical",
      position: 'bottom',
    });

    await toast.present();
  }

  async presentAlert(item_id : string) {
    const alert = await this.alertController.create({
      header: 'INFORMATION',
      subHeader: `${this.productService.getItemProducts(item_id).item_name}`,
      message: 'BASIC PRODUCT INFORMATION COMING SOON!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async onAddCart(item_id : string){
    this.productService.addItemToCart(item_id);
    await this.presentToast()
  }
}
