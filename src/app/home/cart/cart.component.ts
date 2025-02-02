import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ProductService } from 'src/app/services/products/request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  countItem = 0;
  listProducts : any[]= [];

  constructor(private actionSheetCtrl: ActionSheetController, private productService: ProductService) {
    this.listProducts = this.productService.getListCart()
  }

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'DO YOU WANT TO EDIT?',
      buttons: [
        {
          text: 'EDIT',
          data: {
            action: 'share',
          },
        },
        {
          text: 'CANCEL',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'CANCEL',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  onAddItem() {
    this.countItem++;
  }

  onRemoveItem() {
    this.countItem--;
  }
}
