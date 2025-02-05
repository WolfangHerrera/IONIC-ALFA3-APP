import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tabCart: boolean = false;
  tabHome: boolean = false;
  tabAccount: boolean = false;

  setActivePage(page: string): void {
    this.tabCart = page === 'Cart';
    this.tabHome = page === 'Home';
    this.tabAccount = page === 'Account';
  }

  constructor() {}

  onTabChange(event: any) {
    this.setActivePage(event.tab);
  }


}
