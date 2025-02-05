import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  listCart: any[] = [];
  dataProducts: any[] = [];
  totalPriceCart = '0';
  constructor() {}

  getItemProducts(item_id: string) {
    return this.dataProducts.filter(
      (product) => product.item_id === item_id
    )[0];
  }

  async addItemToCart(item_id: string) {
    const item = this.getItemProducts(item_id);
    if (item) {
      const cartItem = this.listCart.find(
        (cartItem) => cartItem.item_id === item_id
      );
      if (cartItem) {
        cartItem.count += 1;
        await this.setTotalPrice();
      } else {
        this.listCart.push({ ...item, count: 1 });
        await this.setTotalPrice();
      }
    }
  }

  getTotalItemCount() {
    return this.listCart.reduce((total, item) => total + (item.count || 1), 0);
    
  }

  async setTotalPrice() {
    const value = this.listCart.reduce(
      (total, item) => total + item.price * (item.count || 1),
      0
    );
    this.totalPriceCart = value.toString();
  }

  async updateItemCountFlagDelete(item_id: string, increment?: boolean) {
    const cartItem = this.listCart.find(
      (cartItem) => cartItem.item_id === item_id
    );
    if (cartItem) {
      if (increment) {
        cartItem.count += 1;
      } else {
        cartItem.count -= 1;
        if (cartItem.count === 0) {
          return true;
        }
      }
      await this.setTotalPrice();
    }
    return false;
  }

  async deleteItemFromListCart(item_id: string) {
    this.listCart = this.listCart.filter(
      (cartItem) => cartItem.item_id !== item_id
    );
    await this.setTotalPrice();
  }

  setDataProducts(data: any) {
    this.dataProducts = data;
  }

  async getListCart() {
    return this.listCart;
  }

  async getTotalPrice() {
    return this.totalPriceCart;
  }
}
