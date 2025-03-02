import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/products/request.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  @Input() tabChanged: boolean = false;
  listProducts: any[] = [];
  totalPrice: string = '0';
  itemsCount: number = 0;
  flagClearCart: boolean = false;
  formCheckOut!: FormGroup;
  flagCustomerDetails: boolean = false;

  constructor(
    private productService: ProductService,
    private requestService: RequestService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.generateFormGroup();
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.ngOnInit();
    }
  }

  async ngOnInit() {
    await this.getDataProductService();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  generateFormGroup() {
    this.formCheckOut = new FormGroup({
      fullNameCustomer: new FormControl(''),
      phoneNumberCustomer: new FormControl(''),
      streetAddressCustomer: new FormControl(''),
      cityCustomer: new FormControl(''),
      documentTypeCustomer: new FormControl(''),
      documentNumberCustomer: new FormControl(''),
      paymentMethodCustomer: new FormControl(''),
      fullNameShipping: new FormControl(''),
      phoneNumberShipping: new FormControl(''),
      streetAddressShipping: new FormControl(''),
      cityShipping: new FormControl(''),
    });
  }

  validateNumberForm(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }

  onCheckOutCart() {
    this.flagCustomerDetails = true;
  }

  async onClearCart() {
    this.listProducts = [];
    await this.productService.setListCart(this.listProducts);
    this.getDataProductService();
  }

  async onConfirmOrder() {
    const orderDetails = {
      CUSTOMER_DETAILS: this.formCheckOut.value,
      PRODUCTS_CART: this.listProducts,
      TOTAL_PRICE: this.totalPrice,
    };
    await this.requestService
      .createOrder(orderDetails)
      .subscribe(async (response) => {
        if (response) {
          this.flagCustomerDetails = false;
          this.flagClearCart = true;
          await this.onClearCart();
          await this.activateToastCheckoutCart();
          setTimeout(() => {
            window.open(response['URL_PAYMENT'], '_blank')?.focus();
          }, 1500);
        }
      });
  }

  async getDataProductService() {
    this.listProducts = await this.productService.getListCart();
    this.flagClearCart = false;
    this.flagCustomerDetails = false;
    this.totalPrice = await this.productService.getTotalPrice();
    this.itemsCount = await this.productService.getTotalItemCount();
  }

  async onUpdateItem(item_id: string, increment: boolean) {
    const flagLastItem = await this.productService.updateItemCountFlagDelete(
      item_id,
      increment
    );
    if (flagLastItem) {
      this.alertDeleteItem(item_id, true);
    }
    await this.getDataProductService();
  }

  async onDeleteItem(item_id: string) {
    await this.productService.deleteItemFromListCart(item_id);
    await this.getDataProductService();
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
      swipeGesture: 'vertical',
      position: 'top',
    });

    await toast.present();
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
}
