import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { HeaderService } from 'src/app/services/header/header.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UserService } from 'src/app/services/user/user.service';
import { typeAccountText } from 'src/app/utils/language/home/account/text';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})
export class AccountComponent implements OnInit {
  @Input() tabChanged: boolean = false;
  @Output() navigateTab: EventEmitter<string> = new EventEmitter();
  flagRegister: boolean = false;
  flagIsLogged: boolean = false;
  flagKeepLoggedIn: boolean = false;
  flagFade: boolean = false;
  responseLogin: any;
  dataRequest!: {
    USERNAME: string;
    PASSWORD: string;
  };
  loginForm!: FormGroup;
  textAccount!: typeAccountText;
  pdfBase64: string[] = [];
  flagPdfBase64: boolean = false;

  constructor(
    private requestService: RequestService,
    private toastController: ToastController,
    private alertController: AlertController,
    private languageService: LanguageService,
    private userService: UserService,
    private readonly headerService: HeaderService
  ) {
    this.textAccount = this.languageService.getTextHomeAccount();
    this.generateFormGroup();
    this.flagKeepLoggedIn = localStorage.getItem('flagKeepLoggedIn') === 'true';
    if (this.flagKeepLoggedIn) {
      this.dataRequest = JSON.parse(localStorage.getItem('userData') || '{}');
      this.sentDataLoginUser(false);
    }
  }

  ngOnInit() {}

  async ngOnChanges() {
    if (this.tabChanged) {
      await this.buildHeader();
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.pdfBase64 = [];
    this.flagPdfBase64 = false;
    if (files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64 = e.target.result as string;
          this.pdfBase64.push(base64.split(',')[1]);
          this.flagPdfBase64 = true;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  downloadMercadoLibrePDF() {    
    this.requestService
      .getMercadoLibrePDF({ LIST_PDFS: [this.pdfBase64] })
      .subscribe({
        next: async (response) => {
          if (response) {
            this.downloadPDF(response.BASE64PDF, 'MELI-ORDER.pdf');
          }
        },
      });
  }

  downloadPDF(base64: string, fileName: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;

  link.click();

  window.URL.revokeObjectURL(link.href);
}


  async buildHeader() {
    this.headerService.setActivatedLeftButton(false);
    this.headerService.setLeftButton('Account');
    this.headerService.setActivatedRightButton(false);
    this.headerService.setRightButton('Cart');
  }

  generateFormGroup() {
    this.loginForm = new FormGroup({
      usernameCustomer: new FormControl(''),
      passwordCustomer: new FormControl(''),
    });
  }

  onNavigateToOrders() {
    this.navigateTab.emit('Order');
  }

  onNavigateToOrdersWholesale() {
    this.navigateTab.emit('OrderWholesale');
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

  async sendDataRegisterUser() {
    this.requestService.registerUser(this.dataRequest).subscribe(
      async (response) => {
        if (response) {
          this.flagFade = true;
          this.activateToast(
            this.textAccount.notLoginUser.toastTextRegister.message,
            'checkmark-circle-outline'
          );
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

  onKeepMeLoggedInChanged(event: any) {
    this.flagKeepLoggedIn = event.detail.checked ? true : false;
  }

  async sentDataLoginUser(showToast: boolean = true) {
    this.requestService.loginUser(this.dataRequest).subscribe({
      next: async (response) => {
        if (response) {
          this.flagFade = true;
          if (showToast) {
            this.activateToast(
              this.textAccount.notLoginUser.toastTextLogin.message,
              'checkmark-circle-outline'
            );
          }
          this.responseLogin = response;
          this.userService.setUserData(this.responseLogin);
          this.userService.setIsLogged(true);
          localStorage.setItem('userData', JSON.stringify(this.dataRequest));
          localStorage.setItem(
            'flagKeepLoggedIn',
            JSON.stringify(this.flagKeepLoggedIn)
          );
          this.flagIsLogged = true;
          this.flagFade = false;
        }
      },
      error: async (responseError) => {
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
      },
    });
  }

  async alertCreateAccount() {
    const alert = await this.alertController.create({
      header: this.textAccount.notLoginUser.alertTextCreateAccount.header,
      message: this.textAccount.notLoginUser.alertTextCreateAccount.message,
      backdropDismiss: false,
      buttons: [
        {
          text:
            this.textAccount?.notLoginUser?.alertTextCreateAccount
              ?.buttons?.[0] || 'ACCEPT',
          handler: async () => {
            this.flagRegister = true;
            await this.sendDataRegisterUser();
          },
        },
        {
          text:
            this.textAccount?.notLoginUser?.alertTextCreateAccount
              ?.buttons?.[1] || 'CANCEL',
        },
      ],
    });

    await alert.present();
  }

  onLogout() {
    this.flagFade = true;
    this.loginForm.reset();
    this.flagIsLogged = false;
    this.activateToast(
      this.textAccount.notLoginUser.toastTextLogout.message,
      'checkmark-circle-outline'
    );
    this.responseLogin = null;
    this.userService.setUserData(this.responseLogin);
    this.userService.setIsLogged(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('flagKeepLoggedIn');
    localStorage.removeItem('flagIsLogged');
    this.flagFade = false;
  }
}
