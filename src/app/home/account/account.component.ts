import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})
export class AccountComponent  implements OnInit {
  flagIsLogged: boolean = false;
  responseLogin: any;
  dataRequestLogin !: {
    USERNAME: string,
    PASSWORD: string
  };
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private requestService: RequestService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.dataRequestLogin = {
        USERNAME: this.loginForm.get('username')?.value,
        PASSWORD: this.loginForm.get('password')?.value
      };
      this.sentDataLoginUser();
    }
  }

  sentDataLoginUser() {
    this.requestService.loginUser(this.dataRequestLogin).subscribe(
      (response) => {
        if (response) {
          this.flagIsLogged = true;
          this.responseLogin = response;
          console.log(this.flagIsLogged);
        }
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }

  onForgotPassword() {
    console.log('Recuperación de contraseña');
  }

}
