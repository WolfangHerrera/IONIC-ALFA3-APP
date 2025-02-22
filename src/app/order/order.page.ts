import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../services/request/request.service';
import { IonTabs } from '@ionic/angular';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage implements OnInit {
  @ViewChild(IonTabs) tabs!: IonTabs;
  isLoading: boolean = true;
  tabOrder: boolean = false;
  order_id: string;
  dataOrder!: any;
  dataCart!: any;


  constructor(private route: ActivatedRoute, private router: Router, private requestService: RequestService) {
    this.order_id = this.route.snapshot.paramMap.get('order_id')!;
    if(!this.order_id){
      this.navigateToHome();
    }
  }

  async ngOnInit() {
    await this.getOrderById();
  }

  async getOrderById(){
    this.requestService.getOrderById(this.order_id).subscribe(
      async (response) => {
        if (response) {
          this.dataOrder = response;
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

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }
}