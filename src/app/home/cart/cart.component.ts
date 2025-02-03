import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ProductService } from 'src/app/services/products/request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  listProducts : any[]= [];
  checkoutValue = 0;

  constructor(private actionSheetCtrl: ActionSheetController, private productService: ProductService, private alertController: AlertController) {
    this.listProducts = this.productService.getListCart()
    this.getTotalPrice()
  }

  ngOnInit() {}

  async showAlert(item_id: string) {
    const alert = await this.alertController.create({
      header: 'DELETE PRODUCT?',
      message: 'IT WILL BE REMOVED FROM YOUR CART.',
      buttons: [
        {
          text: 'ACCEPT',
          handler: () => {
            this.onDeleteItem(item_id);
          },
        },
        {
          text: 'CANCEL',
          handler: () => {
            this.onUpdateItem(item_id, true);
          },
        },
      ],
    });

    await alert.present();
  }

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

  async getTotalPrice() {
    this.checkoutValue = this.listProducts.reduce((total, item) => total + item.price * (item.count || 1), 0);
  }

  async onUpdateItem(item_id: string, increment: boolean) {
    const flagLastItem = this.productService.updateItemCountFlagDelete(item_id, increment);
    if (flagLastItem) {
      this.showAlert(item_id);
    }
    this.listProducts = this.productService.getListCart()
    await this.getTotalPrice()
  }

  onDeleteItem(item_id: string) {
    this.productService.deleteItemFromListCart(item_id);
    this.listProducts = this.productService.getListCart()
  }
}
