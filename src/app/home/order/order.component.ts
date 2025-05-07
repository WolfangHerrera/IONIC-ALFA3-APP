import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request/request.service';
import { UserService } from 'src/app/services/user/user.service';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-order-home',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent implements OnInit {
  @Input() tabChanged: boolean = false;
  flagIsLogged: boolean = false;
  listOrders: any[] = [];
  userData: any;

  constructor(
    private toastController: ToastController,
    private readonly requestService: RequestService,
    private userService: UserService,
    private router: Router,
    private readonly headerService: HeaderService
  ) {
    this.userService
      .getIsLoggedObservable()
      .pipe(
        filter((isLogged) => isLogged === true),
        take(1)
      )
      .subscribe(() => {
        this.userData = this.userService.getUserData();
        this.getOrders();
      });
  }

  async ngOnInit() {
    this.getOrdersInit();
  }

  async getOrdersInit() {
    this.userService
      .getIsLoggedObservable()
      .pipe(
        filter((isLogged) => isLogged === true),
        take(1)
      )
      .subscribe(() => {
        this.userData = this.userService.getUserData();
        this.getOrders();
      });
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.buildHeader();
    }
  }

  async buildHeader() {
    this.headerService.setActivatedLeftButton(true);
    this.headerService.setLeftButton('Account');
    this.headerService.setActivatedRightButton(false);
    this.headerService.setRightButton('Cart');
  }

  async getOrders() {
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
