import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request/request.service';
import { UserService } from 'src/app/services/user/user.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-order-home',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent  implements OnInit {
  @Input() tabChanged: boolean = false;
  flagIsLogged: boolean = false;
  listOrders: any[] = [];
  userData : any;
  
  constructor(private toastController: ToastController, private readonly requestService: RequestService, private userService: UserService) {
  }
  
  async ngOnInit() {
    this.getOrdersInit();
  }

  async getOrdersInit(){
    this.userService.getIsLoggedObservable()
      .pipe(
        filter(isLogged => isLogged === true),
        take(1)
      )
      .subscribe(() => {
        this.userData = this.userService.getUserData();
        this.getOrders();
      });
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.ngOnInit();
    }
  }

  async getOrders(){
    this.requestService.getOrderByCustomerId(this.userData.username).subscribe({
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
