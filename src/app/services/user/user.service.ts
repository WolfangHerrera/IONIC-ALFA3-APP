import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any;
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private listOrdersWholesale : any[] = [];
  private listOrdersWholesaleSelected : any[] = [];

  constructor() {}

  setOrdersWholesale(orders: any) {
    this.listOrdersWholesale = orders;
  }

  getOrdersWholesale() {
    return this.listOrdersWholesale;
  }

  setOrdersWholesaleSelected(orders: any) {
    this.listOrdersWholesaleSelected = orders;
  }
  
  getOrdersWholesaleSelected() {
    return this.listOrdersWholesaleSelected;
  }

  addItemToOrdersWholesaleSelected(itemId: string) {
    if (!this.listOrdersWholesaleSelected.some(order => order === itemId)) {
      this.listOrdersWholesaleSelected.push(itemId);
    }
  }

  deleteItemFromOrdersWholesaleSelected(itemId: string) {
    this.listOrdersWholesaleSelected = this.listOrdersWholesaleSelected.filter(order => order !== itemId);
  }

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

  getIsLoggedObservable() {
    return this.isLoggedIn$.asObservable();
  }

  setIsLogged(isLogged: boolean) {
    this.isLoggedIn$.next(isLogged);
  }

  getUserRole() {
    const userData = this.getUserData();
    if (userData && userData.role) {
      return userData.role;
    }
    return null;
  }
}
