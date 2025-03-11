import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderPageRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OrderPageRoutingModule
  ],
  declarations: [OrderPage, OrderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderPageModule {}
