import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusService } from '../services/status/status.service';
import { IonTabs, ToastController } from '@ionic/angular';
import { ProductService } from '../services/products/request.service';
import { RequestService } from '../services/request/request.service';
import { LanguageService } from '../services/language/language.service';
import { typeTabHomeText } from 'src/app/utils/language/tab/text';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild(IonTabs) tabs!: IonTabs;
  isOffline: boolean = navigator.onLine;
  isLoading: boolean = true;
  toast!: ToastController;
  tabCart: boolean = false;
  tabHome: boolean = false;
  tabAccount: boolean = false;
  textHomeTab!: typeTabHomeText;

  constructor(private readonly statusService: StatusService, private requestService: RequestService, private productService: ProductService, private languageService : LanguageService, private toastController: ToastController) {
    this.getDataItemProduct();
    this.textHomeTab = this.languageService.getTextHomeTab();
  }

  async ngOnInit() {
    this.statusService.getOfflineStatus().subscribe((isOffline) => {
      this.isOffline = isOffline
    if (isOffline) {
      this.presentToast();
    }
    });
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
      this.tabs.select('Home');
    }, 1000);
  }

  getDataItemProduct() {
    this.requestService.getItemProducts().subscribe(
      (response) => {
        if (response) {
          this.productService.setDataProducts(response);
          this.disableLoading();
        }
      },
    );
  }

  setActivePage(page: string): void {
    this.tabCart = page === 'Cart';
    this.tabHome = page === 'Home';
    this.tabAccount = page === 'Account';
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
