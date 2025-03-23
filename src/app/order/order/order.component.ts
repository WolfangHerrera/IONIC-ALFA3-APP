import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { typeOrderText } from 'src/app/utils/language/order/text';

@Component({
  selector: 'app-order-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent {
  @Input() dataOrder!: any;
  @Input() dataCart!: any;
  @Input() orderStatus!: string;
  textOrder!: typeOrderText;

  constructor(private languageService: LanguageService) {
    this.textOrder = this.languageService.getTextOrderOrder();
  }

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }
}