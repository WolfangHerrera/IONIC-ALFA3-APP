import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listCart: any[] = [];
  dataProducts: any[] = []
  constructor() { }

  getItemProducts(item_id: string) {
    return this.dataProducts.filter(product => product.item_id === item_id)[0];
  }

  addItemToCart(item_id: string) {
    const item = this.getItemProducts(item_id);
    this.listCart.push(item);
  }

  setDataProducts(data: any) {
    this.dataProducts = data;
  }

  getListCart() {
    return this.listCart;
  }

}
