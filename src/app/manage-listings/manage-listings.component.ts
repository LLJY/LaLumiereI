import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-manage-listings',
  templateUrl: './manage-listings.component.html',
  styleUrls: ['./manage-listings.component.scss'],
})
export class ManageListingsComponent implements OnInit {

  constructor(public itemsService: ItemsService) {
    // get items on startup of the component
    itemsService.getManagedItems();
   }

  ngOnInit() {}

}
