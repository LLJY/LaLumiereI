import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndividualItemPageRoutingModule } from './individual-item-routing.module';

import { IndividualItemPage } from './individual-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndividualItemPageRoutingModule
  ],
  declarations: [IndividualItemPage]
})
export class IndividualItemPageModule {}
