import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../common-models';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-card-big',
  templateUrl: './item-card-big.component.html',
  styleUrls: ['./item-card-big.component.scss'],
})
export class ItemCardBigComponent implements OnInit {
  @Input() item: Item;
  constructor(public itemsService: ItemsService) { }

  ngOnInit() {}

}
