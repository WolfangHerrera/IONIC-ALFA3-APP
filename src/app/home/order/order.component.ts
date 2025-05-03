import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-order-home',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent  implements OnInit {
  @Input() tabChanged: boolean = false;
  listOrders: any[] = [];
  constructor(private toastController: ToastController, private readonly requestService: RequestService) {
    this.getOrders();
  }

  ngOnInit() {}

  async getOrders(){
    this.requestService.getOrderByCustomerId('').subscribe({
      next: (response) => {
        if (response) {
          this.listOrders = response;
        }
      },
      error: (responseError) => {
        console.error(responseError);
        this.activateToast(responseError.ERROR, 'alert-circle-outline');
      },
    });
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
