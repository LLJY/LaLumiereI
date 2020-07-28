import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditListingsPageRoutingModule } from './add-edit-listings-routing.module';

import { AddEditListingsPage } from './add-edit-listings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditListingsPageRoutingModule
  ],
  declarations: [AddEditListingsPage]
})
export class AddEditListingsPageModule {}
