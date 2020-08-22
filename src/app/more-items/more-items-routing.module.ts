import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreItemsPage } from './more-items.page';

const routes: Routes = [
  {
    path: '',
    component: MoreItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreItemsPageRoutingModule {}
