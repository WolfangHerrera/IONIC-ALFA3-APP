import { Component } from '@angular/core';
import { StatusService } from '../services/status/status.service';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isOffline: boolean = navigator.onLine;

  toast!: ToastController

  tabCart: boolean = false;
  tabHome: boolean = false;
  tabAccount: boolean = false;

  setActivePage(page: string): void {
    this.tabCart = page === 'Cart';
    this.tabHome = page === 'Home';
    this.tabAccount = page === 'Account';
  }

  constructor(private readonly statusService: StatusService, private toastController: ToastController) {
  }

  async ngOnInit() {
    this.statusService.getOfflineStatus().subscribe((isOffline) => {
      this.isOffline = isOffline
    if (isOffline) {
      this.presentToast();
    }
    });
  }

  async presentToast() {
    let toast = await this.toastController.getTop();
    if (toast) {
      await toast.dismiss();
    }
    toast = await this.toastController.create({
      message: 'YOU ARE OFFLINE',
      icon: 'wifi-outline',
      duration: 7000,
      position: 'bottom',
      swipeGesture: 'vertical',
    });
    await toast.present();
  }

  onTabChange(event: any) {
    this.setActivePage(event.tab);
  }

}
