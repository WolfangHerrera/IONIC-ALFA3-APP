import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { RequestService } from 'src/app/services/request/request.service';
import { typeAccountText } from 'src/app/utils/language/home/account/text';

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
  flagFade: boolean = false;
  responseLogin: any;
  dataRequest!: {
    USERNAME: string;
    PASSWORD: string;
    CUSTOMER_DETAILS?: string;
  };
  loginForm!: FormGroup;
  textAccount!: typeAccountText; 

  constructor(
    private requestService: RequestService,
    private toastController: ToastController,
    private alertController: AlertController,
    private languageService: LanguageService
  ) {
    this.textAccount = this.languageService.getTextHomeAccount();
    this.generateFormGroup();
    this.flagIsLogged = localStorage.getItem('flagIsLogged') === 'true';
    if (this.flagIsLogged) {
      this.responseLogin = JSON.parse(localStorage.getItem('userData') || '{}');
    }
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

  validateNumberForm(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async onSubmitLogin() {
    if (this.loginForm.valid) {
      this.dataRequest = {
        USERNAME: this.loginForm.get('usernameCustomer')?.value,
        PASSWORD: this.loginForm.get('passwordCustomer')?.value,
      };
      this.sentDataLoginUser();
    }
  }

  async sendDataRegisterUser(){
    this.requestService.registerUser(this.dataRequest).subscribe(
      async (response) => {
        if (response) {
          this.flagFade = true;
          this.activateToast(this.textAccount.notLoginUser.toastTextRegister.message, 'checkmark-circle-outline');
          setTimeout(async () => {
            await this.sentDataLoginUser();
          }, 1500);
        }
      },
      async (responseError) => {
        if (responseError.error.MESSAGE === 'USER ALREADY EXIST') {
          await this.activateToast(
            this.textAccount.notLoginUser.toastTextUserAlreadyExist.message,
            'person-circle-outline'
          );
        }
      }
    );
  }

  async sentDataLoginUser() {
    this.requestService.loginUser(this.dataRequest).subscribe(
      async (response) => {
        if (response) {
          this.flagFade = true;
          this.flagIsLogged = true;
          localStorage.setItem('flagIsLogged', 'true');
          this.responseLogin = response;
          this.activateToast(this.textAccount.notLoginUser.toastTextLogin.message, 'checkmark-circle-outline');
          this.flagFade = false;
          localStorage.setItem('userData', JSON.stringify(response));
        }
      },
      async (responseError) => {
        if (responseError.error.MESSAGE === 'USER NOT EXIST') {
          await this.activateToast(
            this.textAccount.notLoginUser.toastTextUserNotExist.message,
            'person-circle-outline'
          );
          setTimeout(async () => {
            await this.alertCreateAccount();
          }, 1500);
        }
        if (responseError.error.MESSAGE === 'INVALID PASSWORD') {
          await this.activateToast(
            this.textAccount.notLoginUser.toastTextInvalidPassword.message,
            'person-circle-outline'
          );
        }
      }
    );
  }

  async alertCreateAccount() {
    const alert = await this.alertController.create({
      header: this.textAccount.notLoginUser.alertTextCreateAccount.header,
      message: this.textAccount.notLoginUser.alertTextCreateAccount.message,
      backdropDismiss: false,
      buttons: [
        {
          text: this.textAccount?.notLoginUser?.alertTextCreateAccount?.buttons?.[0] || 'ACCEPT',
          handler: async () => {
            this.flagRegister = true;
            await this.sendDataRegisterUser()
          },
        },
        {
          text: this.textAccount?.notLoginUser?.alertTextCreateAccount?.buttons?.[1] || 'CANCEL',
        },
      ],
    });

    await alert.present();
  }

  onLogout() {
    this.flagFade = true;
    this.loginForm.reset();
    this.flagIsLogged = false;
    this.activateToast(this.textAccount.notLoginUser.toastTextLogout.message, 'checkmark-circle-outline');
    this.responseLogin = null;
    this.flagFade = false;
  }
}
