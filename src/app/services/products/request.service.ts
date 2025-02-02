import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listCart: any[] = [];
  dataProducts: any[] = []
  constructor() { }

  addItemToCart(item_id: string) {
    const item = this.dataProducts.filter(product => product.item_id === item_id);
    this.listCart.push(item[0]);
  }

  setDataProducts(data: any) {
    this.dataProducts = data;
  }

  getListCart() {
    return this.listCart;
  }

}
