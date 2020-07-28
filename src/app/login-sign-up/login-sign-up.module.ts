import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { IonicModule } from '@ionic/angular';

import { LoginSignUpPageRoutingModule } from './login-sign-up-routing.module';

import { LoginSignUpPage } from './login-sign-up.page';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginSignUpPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [LoginSignUpPage, LoginComponent, SignUpComponent]
})
export class LoginSignUpPageModule {}
