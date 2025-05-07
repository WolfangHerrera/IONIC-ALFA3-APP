import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any;
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() {}

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
