import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { ProductService } from 'src/app/services/products/request.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UserService } from 'src/app/services/user/user.service';
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
  totalPriceMin: string = '0';
  itemsCount: number = 0;
  flagClearCart: boolean = false;
  formCheckOut!: FormGroup;
  flagCustomerDetails: boolean = false;
  flagShippingDetails: boolean = true;
  formSelectPaymethod = {
    CARD: 'CREDIT CARD / DEBIT CARD',
    ACCOUNT: 'ACCOUNT TRANSFER (PSE)',
    BANCOLOMBIA: 'BANCOLOMBIA (ACCOUNT)',
    NEQUI: 'NEQUI',
    DAVIPLATA: 'DAVIPLATA',
  };
  textCart!: typeCartText;
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private requestService: RequestService,
    private alertController: AlertController,
    private toastController: ToastController,
    private languageService: LanguageService,
    private userService: UserService
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
      useSameInfo: new FormControl(!this.flagShippingDetails),
    });
  }

  onUseSameInfoChanged(event: any) {
    this.flagShippingDetails = event.detail.checked ? true : false;
    if (this.flagShippingDetails) {
      this.formCheckOut.patchValue({
        fullNameShipping: this.formCheckOut.value.fullNameCustomer,
        phoneNumberShipping: this.formCheckOut.value.phoneNumberCustomer,
        streetAddressShipping: this.formCheckOut.value.streetAddressCustomer,
        cityShipping: this.formCheckOut.value.cityCustomer,
        useSameInfo: this.flagShippingDetails,
      });
    }
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

  async onCheckOutCart() {
    const customerDetails = localStorage.getItem('customerDetails');
    if (customerDetails) {
      await this.alertFormLocalStorage();
    }
    this.flagCustomerDetails = true;
  }

  async onCheckOutCartAdmin(){
    this.formCheckOut.patchValue({
      fullNameCustomer: 'John Doe',
      emailCustomer: 'johndoe@alfa3electricos.com',
      phoneNumberCustomer: '3229873311',
      streetAddressCustomer: 'ALFA3',
      cityCustomer: 'BOGOTÁ',
      documentTypeCustomer: 'CC',
      documentNumberCustomer: '1000101010',
      paymentMethodCustomer: 'MELI',
      fullNameShipping: 'John Doe',
      phoneNumberShipping: '3229873311',
      streetAddressShipping: 'ALFA3',
      cityShipping: 'BOGOTÁ',
      useSameInfo: true,
    });
    await this.alertCheckoutCart()
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
      TOTAL_PRICE_MIN: this.totalPriceMin,
      ITEM_COUNT: this.itemsCount,
    };
    localStorage.setItem(
      'customerDetails',
      JSON.stringify(this.formCheckOut.value)
    );
    localStorage.setItem(
      'flagShippingDetails',
      String(this.flagShippingDetails)
    );
    await this.requestService
      .createOrder(orderDetails)
      .subscribe(async (response) => {
        this.flagCustomerDetails = false;
        this.flagClearCart = true;
        await this.onClearCart();
        await this.activateToastCheckoutCart(response);
        setTimeout(() => {
          window.location.href = response['URL_PAYMENT'];
        }, 1000);
      });
  }

  buildMessageToastCheckoutCart(response: any) {
    return response['STATUS'] === 'MP'
      ? this.textCart.toastCheckoutCartRedirect
      : this.textCart.toastCheckoutCart;
  }

  async getDataProductService() {
    this.listProducts = await this.productService.getListCart();
    this.flagClearCart = false;
    this.flagCustomerDetails = false;
    this.isAdmin = this.userService.getUserRole() === 'ADMIN';
    this.totalPrice = await this.productService.getTotalPrice();
    this.totalPriceMin = await this.productService.getTotalPriceMin();
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
          text: this.textCart?.alertTextDeleteItem?.buttons?.[1] ?? 'CANCEL',
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

  async activateToastCheckoutCart(status: string) {
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
          text:
            this.textCart?.alertTextLocalStorage?.buttons?.[0] ??
            'USE PREVIOUS INFO',
          handler: () => {
            const customerDetails = localStorage.getItem('customerDetails');
            if (customerDetails) {
              this.formCheckOut.setValue(JSON.parse(customerDetails));
            }
            this.flagShippingDetails =
              localStorage.getItem('flagShippingDetails') === 'true'
                ? true
                : false;
            this.formCheckOut.patchValue({
              useSameInfo: this.flagShippingDetails,
            });
          },
        },
        {
          text:
            this.textCart?.alertTextLocalStorage?.buttons?.[1] ?? 'START OVER',
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
          text:
            this.textCart?.alertTextCheckoutCart?.buttons?.[0] ??
            'CONFIRM ORDER',
          handler: async () => {
            await this.onConfirmOrder();
          },
        },
        {
          text:
            this.textCart?.alertTextCheckoutCart?.buttons?.[1] ??
            'CANCEL ORDER',
        },
      ],
    });

    await alert.present();
  }
}
