import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  listCart: any[] = [];
  dataProducts: any[] = [];
  totalPriceCart = '0';
  totalPriceCartMin = '0';

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('listCart', JSON.stringify(this.listCart));
    localStorage.setItem('totalPriceCart', this.totalPriceCart);
    localStorage.setItem('totalPriceCartMin',this.totalPriceCartMin);
  }

  private loadCartFromLocalStorage() {
    const listCart = localStorage.getItem('listCart');
    const totalPriceCart = localStorage.getItem('totalPriceCart');
    const totalPriceCartMin = localStorage.getItem('totalPriceCartMin');
    if (listCart) {
      this.listCart = JSON.parse(listCart);
    }
    if (totalPriceCart) {
      this.totalPriceCart = totalPriceCart;
    }
    if (totalPriceCartMin) {
      this.totalPriceCartMin = totalPriceCartMin;
    }
  }



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
      } else {
        this.listCart.push({ ...item, count: 1 });
      }
      await this.setTotalPrice();
      await this.setTotalPriceMin();
      this.saveCartToLocalStorage();
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
    this.saveCartToLocalStorage();
  }

  async setTotalPriceMin() {
    const value = this.listCart.reduce(
      (total, item) => total + item.min_price * (item.count || 1),
      0
    );
    this.totalPriceCartMin = value.toString();
    this.saveCartToLocalStorage();
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
      this.saveCartToLocalStorage();
    }
    return false;
  }

  async deleteItemFromListCart(item_id: string) {
    this.listCart = this.listCart.filter(
      (cartItem) => cartItem.item_id !== item_id
    );
    await this.setTotalPrice();
    this.saveCartToLocalStorage();
  }

  setDataProducts(data: any) {
    this.dataProducts = data;
  }

  async getListCart() {
    return this.listCart;
  }

  async setListCart(list: any) {
    this.listCart = list;
    this.saveCartToLocalStorage();
  }

  async getTotalPrice() {
    return this.totalPriceCart;
  }

  async getTotalPriceMin() {
    return this.totalPriceCartMin;
  }
}