import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StatusService } from '../services/status/status.service';
import { AlertController, IonTabs, ToastController } from '@ionic/angular';
import { ProductService } from '../services/products/request.service';
import { RequestService } from '../services/request/request.service';
import { LanguageService } from '../services/language/language.service';
import { typeTabHomeText, typeToastText } from 'src/app/utils/language/tab/text';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit{
  @ViewChild(IonTabs) tabs!: IonTabs;
  isOffline: boolean = navigator.onLine;
  isLoading: boolean = true;
  toast!: ToastController;
  tabOrder: boolean = false;
  tabCart: boolean = false;
  tabHome: boolean = false;
  tabAccount: boolean = false;
  textHomeTab!: typeTabHomeText;
  textToastWholesale!: typeToastText;

  constructor(
    private readonly statusService: StatusService,
    private requestService: RequestService,
    private productService: ProductService,
    private languageService: LanguageService,
    private toastController: ToastController,
    private alertController: AlertController,
    private titleService: Title, 
    private metaService: Meta
  ) {
    this.getDataItemProduct();
    this.textHomeTab = this.languageService.getTextHomeTab();
    this.textToastWholesale = this.languageService.getTextToastWholesale();
    this.titleService.setTitle('ALFA 3 ELÉCTRICOS | MULTITOMAS Y REGULADORES DE VOLTAJE');
    this.metaService.updateTag({ name: 'description', content: 'FABRICANTES DE MULTITOMAS Y REGULADORES DE VOLTAJE EN BOGOTÁ' });
  }
  
  async ngOnInit() {
    this.statusService.getOfflineStatus().subscribe((isOffline) => {
      this.isOffline = isOffline;
      if (isOffline) {
        this.presentToast();
      }
    });
  }

  async ngAfterViewInit() {
    await setTimeout(async () => {
       await this.showWelcomeMessage();
    }, 4000);
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
      this.tabs.select('Home');
    }, 1000);
  }

  getDataItemProduct() {
    this.requestService.getItemProducts().subscribe((response) => {
      if (response) {
        this.productService.setDataProducts(response);
        this.disableLoading();
      }
    });
  }

  navigateTab(tab: string) {
    console.log('tab', tab);
    this.setActivePage(tab);
    this.tabs.select(tab);
  }

  wholeSaleWhatsapp(choice = 'not') {
    localStorage.setItem('wholeSaleWhatsapp', 'true');
    if (choice === 'yes') {
      const message = encodeURIComponent('Hola, me gustaría obtener los precios de venta al por mayor.');
      window.open(`https://wa.me/573229873311?text=${message}`, '_blank');
    }
  }

  setActivePage(page: string): void {
    this.tabCart = page === 'Cart';
    this.tabHome = page === 'Home';
    this.tabAccount = page === 'Account';
    this.tabOrder = page === 'Order';
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
    console.log('Tab changed:', event.tab);
    console.log('navigateTab', this.navigateTab);
    
    this.setActivePage(event.tab);
  }

  async showWelcomeMessage() {
    const wholeSaleWhatsapp = localStorage.getItem('wholeSaleWhatsapp');
    const isUserLoggedIn = localStorage.getItem('flagIsLogged');
    if (wholeSaleWhatsapp === 'true' || isUserLoggedIn === 'true') {
      return;
    }
    const alert = await this.alertController.create({
      header: this.textToastWholesale.header,
      subHeader: this.textToastWholesale.subHeader,
      message: `
      <ion-slides class="wrapper">
      <ion-slide>
      <img src="assets/icons/logo.png"/>
      </ion-slide>
      </ion-slides>
      `,
      buttons: [
        {
          text: this.textToastWholesale.buttonText || 'YES, OPEN WHATSAPP',
          handler: () => {
            this.wholeSaleWhatsapp('yes');
          },
        },
        {
          text: this.textToastWholesale.buttonText2 || 'NO, THANKS',
          handler: () => {
            this.wholeSaleWhatsapp();
          },
        },
      ],
      cssClass: 'image-welcome-alert',
    });

    await alert.present();
  }
}
