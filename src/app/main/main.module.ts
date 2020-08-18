import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { MaterialModule } from '../material/material.module';
import { ManageListingsComponent } from '../manage-listings/manage-listings.component';
import { TrackOrdersComponent } from '../track-orders/track-orders.component';
import { HomePage } from '../home/home.page';
import { InboxComponent } from '../inbox/inbox.component';
import { LikedItemsComponent } from '../liked-items/liked-items.component';
import { SubscribedCategoriesComponent } from '../subscribed-categories/subscribed-categories.component';
import { SettingsComponent } from '../settings/settings.component';
import { AboutComponent } from '../about/about.component';
import { IndexComponent } from '../index/index.component';
import { ItemCardComponent } from 'src/item-card/item-card.component';
import { ItemCardBigComponent } from '../item-card-big/item-card-big.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [MainPage, ManageListingsComponent, TrackOrdersComponent, HomePage, InboxComponent,IndexComponent, LikedItemsComponent, SubscribedCategoriesComponent, SettingsComponent, AboutComponent, ItemCardComponent, ItemCardBigComponent]
})
export class MainPageModule { }
