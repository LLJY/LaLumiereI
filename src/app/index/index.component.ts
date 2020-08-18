import { Component, OnInit } from '@angular/core';
import { Item } from '../common-models';
import { LoginSignUpService } from '../login-sign-up.service';
import { ItemsService } from '../items.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  // category
  categories: string[];
  constructor(loginService: LoginSignUpService, public itemsService: ItemsService, private navController: NavController) {
    console.log(itemsService);
    // call the get items function
    itemsService.getItems().then(()=>{
      //TODO remove shimmer
    });
  }

  ngOnInit() {

  }
  /**
   * opens the page with the item
   * @param item 
   */
  openItemPage(item: Item){
    let navigationExtras: NavigationExtras = {state: {item: item}};
    this.navController.navigateForward('/individual-item', navigationExtras);
  }

}
