import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../services/request/request.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false,
})
export class OrderPage {
  order_id: string;
  dataOrder: any;
  productCart: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private requestService: RequestService) {
    this.order_id = this.route.snapshot.paramMap.get('order_id')!;
    if(!this.order_id){
      this.navigateToHome();
    }
  }

  async ngOnInit(){
    await this.getOrderById();
  }

  async getOrderById(){
    this.requestService.getOrderById(this.order_id).subscribe(
      async (response) => {
        if (response) {
          this.dataOrder = response;
          this.productCart = response.products_cart;
          this.isLoading = true;
        }
      },
      async (responseError) => {
        if(responseError){
          this.navigateToHome();
        }
      }
    );
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }
}