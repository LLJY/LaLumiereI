import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/common-models';
import { ItemsService } from 'src/app/items.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  constructor(public itemsService: ItemsService) { }

  ngOnInit() {
  }

}
