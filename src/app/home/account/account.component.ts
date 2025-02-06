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
      message: text,
      icon: icon,
      duration: 2500,
      positionAnchor: 'footer',
      swipeGesture:"vertical",
      position: 'top',
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
        if (responseError.error.MESSAGE === 'USER NOT EXIST') {
            await this.activateToast('SORRY, WE COULDN NOT FIND AN ACCOUNT WITH THAT USERNAME! :)', 'person-circle-outline');
        }
        if (responseError.error.MESSAGE === 'INVALID PASSWORD') {
            await this.activateToast('SORRY, THAT PASSWORD IS NOT RIGHT! :)', 'person-circle-outline');
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
