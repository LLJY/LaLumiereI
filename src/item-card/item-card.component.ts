import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/common-models';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  item: Item
  constructor() { }

  ngOnInit() {
    this.item = new Item("a", "testing", "testingseller", "0", "a", 10, new Date() , 23, 12, "lol", "test", "test", "clothes", 12, ["https://media.karousell.com/media/photos/products/2017/08/21/black_temasek_xxv_t_shirt_1503303024_271b1bcb.jpg"], false, false, "a");
  }

}
