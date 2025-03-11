import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent{
  @Input() dataOrder!: any;
  @Input() dataCart!: any;

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }
}