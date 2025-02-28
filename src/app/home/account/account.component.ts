import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})
export class AccountComponent implements OnInit {
  @Input() tabChanged: boolean = false;
  flagRegister: boolean = false;
  flagIsLogged: boolean = false;
  responseLogin: any;
  dataRequestLogin!: {
    USERNAME: string;
    PASSWORD: string;
  };
  loginForm!: FormGroup;

  constructor(
    private requestService: RequestService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.generateFormGroup();
  }

  ngOnInit() {}

  generateFormGroup() {
    this.loginForm = new FormGroup({
      usernameCustomer: new FormControl(''),
      passwordCustomer: new FormControl(''),
    });
  }

  async activateToast(text?: string, icon?: string) {
    let toast = await this.toastController.getTop();
    if (toast) {
      await toast.dismiss();
    }
    toast = await this.toastController.create({
      message: text,
      icon: icon,
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture: 'vertical',
      position: 'top',
    });

    await toast.present();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async onSubmitLogin() {
    if (this.loginForm.valid) {
      this.dataRequestLogin = {
        USERNAME: this.loginForm.get('usernameCustomer')?.value,
        PASSWORD: this.loginForm.get('passwordCustomer')?.value,
      };
      this.sentDataLoginUser();
    }
  }

  async sentDataLoginUser() {
     this.requestService.loginUser(this.dataRequestLogin).subscribe(
      async (response) => {
        if (response) {
          this.flagIsLogged = true;
          this.responseLogin = response;
        }
      },
      async (responseError) => {
        if (responseError.error.MESSAGE === 'USER NOT EXIST') {
          await this.activateToast(
            'SORRY, WE COULDN NOT FIND AN ACCOUNT WITH THAT USERNAME! :)',
            'person-circle-outline'
          );
          setTimeout(async () => {
          await this.alertCreateAccount();
          }, 1500);
        }
        if (responseError.error.MESSAGE === 'INVALID PASSWORD') {
          await this.activateToast(
            'SORRY, THAT PASSWORD IS NOT RIGHT! :)',
            'person-circle-outline'
          );
        }
      }
    );
  }

  async alertCreateAccount() {
    const alert = await this.alertController.create({
      header: 'DO YOU WANT TO CREATE AN ACCOUNT?',
      message: 'TAP ACCEPT TO CREATE YOUR ACCOUNT.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'ACCEPT',
          handler: () => {
            this.flagRegister = true;
          },
        },
        {
          text: 'CANCEL',
        },
      ],
    });

    await alert.present();
  }

  onLogout() {
    this.loginForm.reset();
    this.flagIsLogged = false;
    this.responseLogin = null;
  }
}
