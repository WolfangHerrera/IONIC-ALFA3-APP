import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'account/orders',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
