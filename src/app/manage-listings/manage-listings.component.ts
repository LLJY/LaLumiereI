import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { NavController } from '@ionic/angular';
import { CustomNavigationService } from '../custom-navigation.service';

@Component({
  selector: 'app-manage-listings',
  templateUrl: './manage-listings.component.html',
  styleUrls: ['./manage-listings.component.scss'],
})
export class ManageListingsComponent implements OnInit {

  constructor(public itemsService: ItemsService, private customNav: CustomNavigationService) {
    // get items on startup of the component
    itemsService.getManagedItems();
   }
  
  addClick(){
    this.customNav.forward('/add-edit-item');
  }

  ngOnInit() {}

}
