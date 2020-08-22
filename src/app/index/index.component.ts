import { Component, OnInit } from '@angular/core';
import { Item } from '../common-models';
import { LoginSignUpService } from '../login-sign-up.service';
import { ItemsService } from '../items.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { CustomNavigationService } from '../custom-navigation.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  // category
  categories: string[];
  constructor(loginService: LoginSignUpService, public itemsService: ItemsService, private customNav: CustomNavigationService) {
    console.log(itemsService);
    // call the get items function
    itemsService.getItems().then(()=>{
      //TODO remove shimmer
    });
  }
  public moreHot(){
    this.customNav.forward('/more-items', {state: {title: "Hot Items", items: this.itemsService.hotItems}});
  }
  public moreFollow(){
    this.customNav.forward('/more-items', {state: {title: "People you follow", items: this.itemsService.followItems}});
  }
  public moreInterest(){
    this.customNav.forward('/more-items', {state: {title: "Items you might like", items: this.itemsService.interestItems}});
  }

  ngOnInit() {

  }

}
