import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndividualItemPageRoutingModule } from './individual-item-routing.module';

import { IndividualItemPage } from './individual-item.page';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndividualItemPageRoutingModule,
    MaterialModule,
  ],
  declarations: [IndividualItemPage]
})
export class IndividualItemPageModule {}
