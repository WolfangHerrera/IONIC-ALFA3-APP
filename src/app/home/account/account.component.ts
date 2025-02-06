import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})
export class AccountComponent  implements OnInit {
  @Input() tabChanged: boolean = false;
  flagIsLogged: boolean = false;
  responseLogin: any;
  dataRequestLogin !: {
    USERNAME: string,
    PASSWORD: string
  };
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private requestService: RequestService, private toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  
  async activateToast(text?: string, icon?: string) {
    let toast = await this.toastController.getTop();
    if (toast) {
      await toast.dismiss();
    }
    toast = await this.toastController.create({
      message: 'HOLA',
      icon: 'cart-outline',
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture:"vertical",
      position: 'bottom',
    });

    await toast.present();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.dataRequestLogin = {
        USERNAME: this.loginForm.get('username')?.value,
        PASSWORD: this.loginForm.get('password')?.value
      };
      this.sentDataLoginUser();
    }
  }

  async sentDataLoginUser() {
    await this.requestService.loginUser(this.dataRequestLogin).subscribe(
      async (response) => {
        if (response) {
          this.flagIsLogged = true;
          this.responseLogin = response;
        }
      },
      async (responseError) => {
        if (responseError.error.MESSAGE === 'INVALID PASSWORD') {
          await this.activateToast('INVALID PASSWORD', 'warning');
        }
      }
    );
  }

  onLogout() {
    this.loginForm.reset();
    this.flagIsLogged = false;
    this.responseLogin = null;

  }

}
