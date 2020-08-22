import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-liked-items',
  templateUrl: './liked-items.component.html',
  styleUrls: ['./liked-items.component.scss'],
})
export class LikedItemsComponent implements OnInit {

  constructor(public itemsService: ItemsService) {

   }

  ngOnInit() {
    // get liked items on init.
    this.itemsService.getLikedItems();
  }

}
