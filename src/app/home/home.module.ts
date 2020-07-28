import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MaterialModule } from '../material/material.module';
import { HomePageRoutingModule } from './home-routing.module';
import { LoginComponent } from '../login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MaterialModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
