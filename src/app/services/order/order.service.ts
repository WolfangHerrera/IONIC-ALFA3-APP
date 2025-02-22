import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  dataOrder: any[] = [];
  dataCart: any[] = [];

  async getDataOrder(){
    return this.dataOrder;
  }

  async getDataCart(){
    return this.dataCart;
  }

  async setDataOrder(data: any){
    this.dataOrder = data;
    this.dataCart = data.products_cart;
    console.log(data);
    console.log(this.dataOrder);
    console.log(this.dataCart);
    
  }
}
