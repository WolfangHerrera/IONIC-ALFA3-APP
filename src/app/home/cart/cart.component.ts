import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/products/request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  @Input() tabChanged: boolean = false;
  listProducts : any[]= [];
  totalPrice: string = '0';
  itemsCount: number = 0;
  flagClearCart: boolean = false;
  myGroup!: FormGroup;
  flagCustomerDetails: boolean = false;

  constructor(private productService: ProductService, private alertController: AlertController, private toastController: ToastController) {
    this.myGroup = new FormGroup({
      fullName: new FormControl(''),
      phoneNumber: new FormControl(''),
      streetAddress: new FormControl(''),
      city: new FormControl(''),
      documentType: new FormControl(''),
      documentNumber: new FormControl(''),
    });
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.ngOnInit()
    }
  }

  async ngOnInit() {
    await this.getDataProductService();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.getDataProductService();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async alertDeleteItem(item_id: string, flagLastItem: boolean = false) {
    const alert = await this.alertController.create({
      header: 'DELETE PRODUCT?',
      message: 'IT WILL BE REMOVED FROM YOUR CART.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'ACCEPT',
          handler: () => {
            this.onDeleteItem(item_id);
          },
        },
        {
          text: 'CANCEL',
          handler: () => {
            if (flagLastItem) {
              this.onUpdateItem(item_id, true);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  async alertCheckoutCart() {
    const alert = await this.alertController.create({
      header: 'PROCEED WITH YOUR ORDER?',
      message: 'TAP CONFIRM ORDER TO FINALIZE YOUR PURCHASE.',
      backdropDismiss: false,
      buttons: [
      {
        text: 'CONFIRM ORDER',
        handler: async () => {
          await this.onConfirmOrder();
        },
      },
      {
        text: 'CANCEL ORDER',
      },
      ],
    });

    await alert.present();
  }

  async activateToastCheckoutCart() {
    let toast = await this.toastController.getTop();
    if (toast) {
      await toast.dismiss();
    }
    toast = await this.toastController.create({
      message: 'ORDER PLACED SUCCESSFULLY!',
      icon: 'cart-outline',
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture:"vertical",
      position: 'top',
    });

    await toast.present();
  }

  onCheckOutCart(){
    this.flagCustomerDetails = true;
  }

  onCheckOutOrder(){
    this.alertCheckoutCart();
  }

  async onConfirmOrder(){
    this.flagCustomerDetails = false;
    this.flagClearCart = true;
    this.listProducts = [];
    await this.productService.setListCart(this.listProducts);
    await this.activateToastCheckoutCart();
  }

  async getDataProductService(){
    this.listProducts = await this.productService.getListCart();
    this.flagClearCart = false;
    this.flagCustomerDetails = false;
    this.totalPrice = await this.productService.getTotalPrice();
    this.totalPrice = this.setDotOnPrice(this.totalPrice);
    this.itemsCount = await this.productService.getTotalItemCount();
  }

  async onUpdateItem(item_id: string, increment: boolean) {
    const flagLastItem = await this.productService.updateItemCountFlagDelete(item_id, increment);
    if (flagLastItem) {
      this.alertDeleteItem(item_id, true);
    }
    await this.getDataProductService();
  }

  async onDeleteItem(item_id: string) {
    await this.productService.deleteItemFromListCart(item_id);
    await this.getDataProductService();
  }
}
