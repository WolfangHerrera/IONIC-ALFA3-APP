import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSelect, ToastController } from '@ionic/angular';
import { filter, take } from 'rxjs';
import { HeaderService } from 'src/app/services/header/header.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order-wholesale',
  templateUrl: './order-wholesale.component.html',
  styleUrls: ['./order-wholesale.component.scss'],
  standalone: false,
})
export class OrderWholesaleComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('mySelect', { static: false }) selectRef!: IonSelect;
  @Input() tabChanged: boolean = false;
  flagIsLogged: boolean = false;
  listOrders: any[] = [];
  listOrdersWholesaleSelected: any[] = [];
  filterSelected: string = 'NOT_PAID';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private readonly requestService: RequestService,
    private userService: UserService,
    private readonly headerService: HeaderService
  ) {
    this.getOrdersWholesale();
  }

  async ngOnInit() {
    await this.buildHeader();
    await this.getOrdersWholesale();

  }
  
  async ngOnChanges() {
    if (this.tabChanged) {
      await this.ngOnInit()
    }
  }

  addItemToPayment(event: any,item_id: string) {
    const flag = event.detail.checked ? true : false;
    if (flag) {
      this.userService.addItemToOrdersWholesaleSelected(item_id);
    }
    if (!flag) {
      this.userService.deleteItemFromOrdersWholesaleSelected(item_id);
    }
    this.listOrdersWholesaleSelected = this.userService.getOrdersWholesaleSelected();
  }

  async getOrdersWholesale() {
    this.listOrders = this.userService.getOrdersWholesale();
  }

  filterOrdersWithSelected() {
    return this.listOrders.filter(order =>
      !this.listOrdersWholesaleSelected.includes(order.id)
    );
  }

  async updateOrdersByList(listOrders: any[], status: string, imgBase64: string) {
    const listOrderSelected = {
        LIST_ORDERS: listOrders,
        IMG: imgBase64,
    }
    this.requestService.updateOrdersWithSubStatus(status, listOrderSelected).subscribe({
      next: async (response) => {
        if (response) {
          await this.activateToast('ORDER UPDATED SUCCESSFUL!', 'checkmark-circle-outline');
          this.getOrdersWholesaleSelected(this.filterSelected);
      }
    }});
  }

  async onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        console.log(this.listOrders);
        this.listOrders = this.filterOrdersWithSelected();
        console.log(this.listOrders);

        this.updateOrdersByList(this.listOrdersWholesaleSelected, 'CLOSED', base64String);
      };
      reader.readAsDataURL(file);
      const topAlert = await this.alertController.getTop();
      if (topAlert) {
        await topAlert.dismiss();
      }
    }
  }

  

  async alertPaymentItems(itemId?: string) {
    const alert = await this.alertController.create({
      header: 'DO YOU WANT TO PAY?',
      message: 'YOU ARE ABOUT TO PAY FOR THE SELECTED ITEMS',
      inputs: [
        { name: 'PAY', type: 'radio', label: 'PAY', value: 'PAY', checked: true },
        { name: 'RETURN', type: 'radio', label: 'RETURN', value: 'RETURN' }
      ],
      backdropDismiss: false,
      buttons: [
        {
          text: 'CONFIRM',
          handler: () => {
            if (itemId) {
              this.listOrdersWholesaleSelected = [itemId]
            }
            this.fileInput.nativeElement.click();
          },
        },
        {
          text: 'CANCEL',
          handler: () => {
          },
        },
      ],
    });

    await alert.present();
  }

  async alertFilterInfo() {
    const alert = await this.alertController.create({
      header: 'FILTER TO VIEW ITEMS',
      inputs: [
        { name: 'NOT_PAID', type: 'radio', label: 'NOT PAID', value: 'NOT_PAID', checked: this.filterSelected === 'NOT_PAID' },
        { name: 'CLOSED', type: 'radio', label: 'CLOSED', value: 'CLOSED', checked: this.filterSelected === 'CLOSED'},
        { name: 'RETURNED', type: 'radio', label: 'RETURNED', value: 'RETURNED', checked: this.filterSelected === 'RETURNED'}
      ],
      backdropDismiss: false,
      buttons: [
        {
          text: 'APPLY',
          handler: (selectedValue) => {
            this.filterSelected = selectedValue;
            this.getOrdersWholesaleSelected(selectedValue);
          },
        },
        {
          text: 'CANCEL',
          handler: () => {
          },
        },
      ],
    });

    await alert.present();
  }


  getOrdersWholesaleSelected(status: string) {
    this.requestService.getOrdersBySubStatus(status).subscribe({
      next: (response) => {
        if (response) {
          this.listOrders = response;
        }
      },
      error: (responseError) => {
        console.error(responseError);
      },
    });
  }

  async buildHeader() {
    this.headerService.setActivatedLeftButton(true);
    this.headerService.setLeftButton('Account');
    this.headerService.setActivatedRightButton(false);
    this.headerService.setRightButton('Cart');
  }

  getFormattedDateFromString(input: string): string {
    const parts = input.split('-');
    if (parts.length < 2) {
      return 'Fecha inválida';
    }

    const rawDate = parts[1];
    if (rawDate.length !== 8) {
      return 'Fecha inválida';
    }

    const year = rawDate.substring(0, 4);
    const month = rawDate.substring(4, 6);
    const day = rawDate.substring(6, 8);

    const months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    const monthName = months[parseInt(month, 10) - 1];
    if (!monthName) {
      return 'Mes inválido';
    }

    return `${day}/${monthName}/${year}`;
  }

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }

  setSpaceOnStatus(status: string) {
    return status.replace(/_/g, ' ');
  }

  async activateToast(text?: string, icon?: string) {
    let toast = await this.toastController.getTop();
    if (toast) {
      await toast.dismiss();
    }
    toast = await this.toastController.create({
      message: text,
      icon: icon,
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture: 'vertical',
      position: 'top',
    });

    await toast.present();
  }
}
