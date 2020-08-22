import { Component, OnInit } from '@angular/core';
import { CustomNavigationService } from '../custom-navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../common-models';

@Component({
  selector: 'app-more-items',
  templateUrl: './more-items.page.html',
  styleUrls: ['./more-items.page.scss'],
})
export class MoreItemsPage implements OnInit {
  public title = "More Items!";
  public items: Array<Item>;
  constructor(private customNav: CustomNavigationService, private router: Router) { 
    // get the state items from router.
    this.title = router.getCurrentNavigation().extras.state.title;
    this.items = router.getCurrentNavigation().extras.state.items;
  }

  ngOnInit() {
  }
  public onBackPressed(){
    this.customNav.back();
  }

}
