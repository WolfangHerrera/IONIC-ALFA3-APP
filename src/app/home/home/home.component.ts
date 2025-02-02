import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { RequestService } from 'src/app/services/request/request.service';


@Component({
  selector: 'app-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent  {
  selectedSegment: string = 'first';
  powerStrip = [];
  voltageRegulator = [];
  products = []

  ignoreItem(item: { item_id: string }): boolean {
    const ignoredIds = ['EE4S1M', 'E4S1M'];
    return ignoredIds.includes(item.item_id);
  }

  constructor(private requestService: RequestService){
    this.getDataItemProduct()
  }


  getDataItemProduct() {
    this.requestService.getItemProducts().subscribe(
      (response) => {
        if (response) {
          this.products = response;
            this.voltageRegulator = this.products.filter((item: { item_id: string }) => this.ignoreItem(item));
            this.powerStrip = this.products.filter((item: { item_id: string }) => !this.ignoreItem(item));
        }
      },
    );
  }
}
