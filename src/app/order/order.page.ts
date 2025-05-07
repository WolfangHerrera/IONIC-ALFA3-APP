import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { RequestService } from '../services/request/request.service';
import { LanguageService } from '../services/language/language.service';
import { typeTabOrderText } from '../utils/language/tab/text';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage {
  @ViewChild(IonTabs) tabs!: IonTabs;
  isLoading: boolean = true;
  tabOrder: boolean = false;
  order_id: string;
  dataOrder!: any;
  dataCart!: any;
  orderStatus!: string;
  textOrderTab!: typeTabOrderText;

  constructor(private route: ActivatedRoute, private router: Router, private requestService: RequestService, private languageService : LanguageService) {
    this.textOrderTab = this.languageService.getTextOrderTab();
    this.order_id = this.route.snapshot.paramMap.get('order_id')!;
    if(!this.order_id){
      this.navigateToHome();
    }
  }

  async ngOnInit() {
    await this.getOrderById();
  }

  navigateTab(tab: string) {
    this.router.navigate([tab]);
  }

  async getOrderById(){
    this.requestService.getOrderById(this.order_id).subscribe(
      async (response) => {
        if (response) {
          this.dataOrder = response;
          this.orderStatus = this.languageService.returnOrderStatus(this.dataOrder?.status);
          this.dataCart = response.products_cart;
          await this.disableLoading();
        }
      },
      async (responseError) => {
        if(responseError){
          this.navigateToHome();
        }
      }
    );
  }

  async disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
      this.tabs.select('Order');
    }, 1000);
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

  setActivePage(page: string): void {
    this.tabOrder = page === 'Order';
  }

  onTabChange(event: any) {
    this.setActivePage(event.tab);
  }

}