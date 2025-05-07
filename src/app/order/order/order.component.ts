import { Component, Input, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header/header.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { typeOrderText } from 'src/app/utils/language/order/text';

@Component({
  selector: 'app-order-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent {
  @Input() tabChanged: boolean = false;
  @Input() dataOrder!: any;
  @Input() dataCart!: any;
  @Input() orderStatus!: string;
  textOrder!: typeOrderText;

  constructor(private languageService: LanguageService, private readonly headerService: HeaderService
  ) {
    this.textOrder = this.languageService.getTextOrderOrder();
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.buildHeader()
    }
  }

  async buildHeader() {
    this.headerService.setActivatedLeftButton(true);
    this.headerService.setLeftButton('/Home');
    this.headerService.setActivatedRightButton(false);
    this.headerService.setRightButton('Cart');
  }

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });
  }
}