import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { AboutComponent } from '../about/about.component';
import { ManageListingsComponent } from '../manage-listings/manage-listings.component';
import { TrackOrdersComponent } from '../track-orders/track-orders.component';
import { IndexComponent } from '../index/index.component';
import { InboxComponent } from '../inbox/inbox.component';
import { LikedItemsComponent } from '../liked-items/liked-items.component';
import { SubscribedCategoriesComponent } from '../subscribed-categories/subscribed-categories.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[
      {path:"/**", redirectTo: "home"},
      {path: "", redirectTo: "home"},
      {path: "manage", component: ManageListingsComponent},
      {path: "trackorders", component: TrackOrdersComponent},
      {path: "home", component: IndexComponent},
      {path: "inbox", component: InboxComponent},
      {path: "liked", component: LikedItemsComponent},
      {path: "subscribed", component: SubscribedCategoriesComponent},
      {path: "settings", component: SettingsComponent},
      {path: "about", component: AboutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
