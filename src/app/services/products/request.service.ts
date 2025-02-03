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
    if (item) {
      const cartItem = this.listCart.find(cartItem => cartItem.item_id === item_id);
      if (cartItem) {
      cartItem.count += 1;
      } else {
      this.listCart.push({ ...item, count: 1 });
      }
    }
  }

  updateItemCountFlagDelete(item_id: string, increment?: boolean) {
    const cartItem = this.listCart.find(cartItem => cartItem.item_id === item_id);
    if (cartItem) {
      if (increment) {
        cartItem.count += 1;
      } 
      else {
        cartItem.count -= 1;
        if (cartItem.count === 0) {
          return true;
        }
      }
    }
    return false;
  }

  deleteItemFromListCart(item_id: string) {
    this.listCart = this.listCart.filter(cartItem => cartItem.item_id !== item_id);
  }

  setDataProducts(data: any) {
    this.dataProducts = data;
  }

  getListCart() {
    return this.listCart;
  }

}
