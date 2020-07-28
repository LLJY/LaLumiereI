import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditListingsPage } from './add-edit-listings.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditListingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditListingsPageRoutingModule {}
