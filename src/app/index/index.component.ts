import { Component, OnInit } from '@angular/core';
import { Item } from '../common-models';
import { LoginSignUpService } from '../login-sign-up.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  // category
  categories: string[];
  constructor(loginService: LoginSignUpService, public itemsService: ItemsService) {
    console.log(itemsService);
    // call the get items function
    itemsService.getItems().then(()=>{
      //TODO remove shimmer
    });
  }

  ngOnInit() {
   
    

  }

}
