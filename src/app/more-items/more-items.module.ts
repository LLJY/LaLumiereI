import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreItemsPageRoutingModule } from './more-items-routing.module';

import { MoreItemsPage } from './more-items.page';
import { ItemCardBigComponent } from '../item-card-big/item-card-big.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreItemsPageRoutingModule,
    MaterialModule,
  ],
  declarations: [MoreItemsPage, ItemCardBigComponent]
})
export class MoreItemsPageModule {}
