import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(private productService: ProductService, private alertController: AlertController) {
  }

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.ngOnInit()
    }
  }

  async ngOnInit() {
    await this.getDataProductService();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.getDataProductService();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async alertDeleteItem(item_id: string, flagLastItem: boolean = false) {
    const alert = await this.alertController.create({
      header: 'DELETE PRODUCT?',
      message: 'IT WILL BE REMOVED FROM YOUR CART.',
      backdropDismiss: false,
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
            if (flagLastItem) {
              this.onUpdateItem(item_id, true);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  setDotOnPrice(price: string) {
    return parseFloat(price).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  onCheckOutCart(){
    console.log('CHECK OUT CART');
    console.log(this.listProducts);
    console.log(this.totalPrice);
    
  }

  async getDataProductService(){
    this.listProducts = await this.productService.getListCart();
    this.totalPrice = await this.productService.getTotalPrice();
    this.totalPrice = this.setDotOnPrice(this.totalPrice);
    this.itemsCount = await this.productService.getTotalItemCount();
  }

  async onUpdateItem(item_id: string, increment: boolean) {
    const flagLastItem = await this.productService.updateItemCountFlagDelete(item_id, increment);
    if (flagLastItem) {
      this.alertDeleteItem(item_id, true);
    }
    await this.getDataProductService();
  }

  async onDeleteItem(item_id: string) {
    await this.productService.deleteItemFromListCart(item_id);
    await this.getDataProductService();
  }
}
