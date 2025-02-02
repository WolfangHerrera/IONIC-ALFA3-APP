import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent implements OnInit {
  countItem = 0;

  constructor(private actionSheetCtrl: ActionSheetController) {}

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
