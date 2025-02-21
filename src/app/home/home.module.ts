import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { OrderComponent } from "./order/order.component";
import { CartComponent } from "./cart/cart.component";
import { AccountComponent } from "./account/account.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
],
  declarations: [
    HomePage,
    OrderComponent,
    CartComponent,
    AccountComponent,
    HomeComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
