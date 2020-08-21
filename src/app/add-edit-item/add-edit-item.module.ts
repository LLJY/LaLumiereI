import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditItemPageRoutingModule } from './add-edit-item-routing.module';

import { AddEditItemPage } from './add-edit-item.page';
import { MaterialModule } from '../material/material.module';
import { Camera } from '@ionic-native/camera/ngx';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditItemPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddEditItemPage, AlertDialogComponent]
})
export class AddEditItemPageModule {}
