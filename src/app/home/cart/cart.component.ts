import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { ProductService } from 'src/app/services/products/request.service';
import { RequestService } from 'src/app/services/request/request.service';
import { typeCartText } from 'src/app/utils/language/home/cart/text';

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
  flagShippingDetails: boolean = false;
  formSelectPaymethod = {
    CARD: 'CREDIT CARD / DEBIT CARD',
    ACCOUNT: 'ACCOUNT TRANSFER (PSE)',
    BANCOLOMBIA: 'BANCOLOMBIA (ACCOUNT)',
    NEQUI: 'NEQUI',
    DAVIPLATA: 'DAVIPLATA',
  }
  textCart!: typeCartText; 

  constructor(
    private productService: ProductService,
    private requestService: RequestService,
    private alertController: AlertController,
    private toastController: ToastController,
    private languageService: LanguageService,
  ) {
    this.textCart = this.languageService.getTextHomeCart();
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

  generateFormGroup() {
    this.formCheckOut = new FormGroup({
      fullNameCustomer: new FormControl(''),
      emailCustomer: new FormControl(''),
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
      useSameInfo: new FormControl(false),
    });
  }

  onUseSameInfoChanged(event: any) {
    this.flagShippingDetails = true ? event.detail.checked : false;
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
    const customerDetails = localStorage.getItem('customerDetails');
    if (customerDetails) {
      this.alertFormLocalStorage();
    }
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
    localStorage.setItem('customerDetails', JSON.stringify(this.formCheckOut.value));
    await this.requestService
      .createOrder(orderDetails)
      .subscribe(async (response) => {
        this.flagCustomerDetails = false;
        this.flagClearCart = true;
        await this.onClearCart();
        await this.activateToastCheckoutCart(response);
        setTimeout(() => {
          window.location.href = response['URL_PAYMENT']
        }, 1000);
      });
  }

  buildMessageToastCheckoutCart(response: any) {
    return response['STATUS'] === 'MP' ? this.textCart.toastCheckoutCartRedirect : this.textCart.toastCheckoutCart;
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
      header: this.textCart.alertTextDeleteItem.header,
      message: this.textCart.alertTextDeleteItem.message,
      backdropDismiss: false,
      buttons: [
        {
          text: this.textCart?.alertTextDeleteItem?.buttons?.[0] ?? 'DELETE',
          handler: () => {
            this.onDeleteItem(item_id);
          },
        },
        {
          text: this.textCart?.alertTextDeleteItem?.buttons?.[0] ?? 'CANCEL',
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

  async activateToastCheckoutCart(status : string) {
    const message = this.buildMessageToastCheckoutCart(status);
    let toast = await this.toastController.getTop();

    if (toast) {
      await toast.dismiss();
    }

    toast = await this.toastController.create({
      message: message,
      icon: 'cart-outline',
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture: 'vertical',
      position: 'top',
    });

    await toast.present();
  }

  async alertFormLocalStorage() {
    const alert = await this.alertController.create({
      header: this.textCart.alertTextLocalStorage.header,
      backdropDismiss: false,
      buttons: [
        {
          text: this.textCart?.alertTextLocalStorage?.buttons?.[0] ?? 'USE PREVIOUS INFO',
          handler: () => {
            const customerDetails = localStorage.getItem('customerDetails');
            if (customerDetails) {
              this.formCheckOut.setValue(JSON.parse(customerDetails));
            }
            const flagShippingDetails = localStorage.getItem('flagShippingDetails');
            if (flagShippingDetails) {
              this.flagShippingDetails = true;
            }
          },
        },
        {
          text: this.textCart?.alertTextLocalStorage?.buttons?.[0] ?? 'START OVER',
          handler: async () => {
            this.formCheckOut.reset();
            localStorage.removeItem('customerDetails');
            localStorage.removeItem('flagShippingDetails');
            this.flagShippingDetails = false;
          },
        },
      ],
    });
    await alert.present();
  }

  async alertCheckoutCart() {
    const alert = await this.alertController.create({
      header: this.textCart.alertTextCheckoutCart.header,
      message: this.textCart.alertTextCheckoutCart.message,
      backdropDismiss: false,
      buttons: [
        {
          text: this.textCart?.alertTextCheckoutCart?.buttons?.[0] ?? 'CONFIRM ORDER',
          handler: async () => {
            await this.onConfirmOrder();
          },
        },
        {
          text: this.textCart?.alertTextCheckoutCart?.buttons?.[0] ?? 'CANCEL ORDER',
        },
      ],
    });

    await alert.present();
  }
}
