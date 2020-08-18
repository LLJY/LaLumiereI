import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../common-models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-individual-item',
  templateUrl: './individual-item.page.html',
  styleUrls: ['./individual-item.page.scss'],
})
export class IndividualItemPage implements OnInit, AfterViewInit {
  public item: Item;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private navController: NavController) {
    // get the parameters passed to it
    activeRoute.queryParams.subscribe(params=>{
      if(router.getCurrentNavigation().extras.state){
        this.item = this.router.getCurrentNavigation().extras.state.item;
      }
    });
   }
   onBackPressed(){
     // back button will not activate this
    this.navController.navigateBack(['/main/home']);
   }

  ngOnInit() {
  }
  ngAfterViewInit(){

  }

}
