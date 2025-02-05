import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/products/request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  @Input() tabChanged: boolean = false;
  listProducts : any[]= [];
  totalPrice: string = '0';
  itemsCount: number = 0;

  constructor(private actionSheetCtrl: ActionSheetController, private navCtrl: NavController, private productService: ProductService, private alertController: AlertController) {
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.ngOnInit()
    }
  }

  async ngOnInit() {
    await this.getDataProductService();
  }

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

  async getDataProductService(){
    this.listProducts = await this.productService.getListCart();
    this.totalPrice = await this.productService.getTotalPrice();
    this.itemsCount = await this.productService.getTotalItemCount();
  }

  async onUpdateItem(item_id: string, increment: boolean) {
    const flagLastItem = await this.productService.updateItemCountFlagDelete(item_id, increment);
    if (flagLastItem) {
      this.showAlert(item_id);
    }
    await this.getDataProductService();
  }

  async onDeleteItem(item_id: string) {
    await this.productService.deleteItemFromListCart(item_id);
    await this.getDataProductService();
  }
}
