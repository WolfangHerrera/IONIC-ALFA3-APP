import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent  implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'EDIT PRODUCT',
      buttons: [
        {
          text: 'REMOVE',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'ADD',
          role: 'selected',
          data: {
            action: 'share',
          },
        },
        {
          text: 'LESS',
          role: 'selected',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

}
