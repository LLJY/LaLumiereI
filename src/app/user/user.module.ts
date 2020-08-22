import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { MaterialModule } from '../material/material.module';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
],
  declarations: [UserPage, AlertDialogComponent]
})
export class UserPageModule {}
