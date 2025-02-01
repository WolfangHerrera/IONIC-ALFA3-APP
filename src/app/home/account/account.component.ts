import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})
export class AccountComponent  implements OnInit {
  
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
      this.navCtrl.navigateForward('/home');
    } else {
      console.log('Formulario inválido');
    }
  }

  onForgotPassword() {
    console.log('Recuperación de contraseña');
  }

}
