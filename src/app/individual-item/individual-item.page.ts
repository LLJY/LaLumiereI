import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Item } from '../common-models';
import { NavController } from '@ionic/angular';
import { CustomNavigationService } from '../custom-navigation.service';
import { ItemsService } from '../items.service';
import { LoginSignUpService } from '../login-sign-up.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-individual-item',
  templateUrl: './individual-item.page.html',
  styleUrls: ['./individual-item.page.scss'],
})
export class IndividualItemPage implements OnInit, AfterViewInit {
  public item: Item;
  constructor(private activeRoute: ActivatedRoute, private router: Router, public loginService: LoginSignUpService, private customNavigation: CustomNavigationService, private itemsService: ItemsService, public matDialog: MatDialog) {
    // get the parameters passed to it
    activeRoute.queryParams.subscribe(params=>{
      if(router.getCurrentNavigation().extras.state){
        this.item = this.router.getCurrentNavigation().extras.state.item;
      }
    });
   }
   onBackPressed(){
    this.customNavigation.back();
   }
   /**
    * Deletes the item
    */
   public deleteItem(){
    let dialogRef = this.matDialog.open(AlertDialogComponent, {
      disableClose: true,
      width: " 80%",
      height: "30%",
    });
    dialogRef.componentInstance.title = "Delete Post?";
    // dialog returns true or false based off positive and negative response.
    dialogRef.afterClosed().subscribe((value) => {
      // if positive answer
      if(value){
        this.itemsService.deleteItem(this.item).then(result=>{
          if(result == "success"){
            this.customNavigation.back();
            // TODO SHOW SNACKBAR SUCCESS
          }else{
            // TODO SHOW SNACKBAR ERROR
          }
        }).catch(error=>{
          // TODO SHOW SNACKBAR ERROR
        })
      }
    });
   
   }
   /**
    * opens the edit item page
    */
   public editItem(){
    let navigationExtras: NavigationExtras = { state: { item: this.item } };
    this.customNavigation.forward('/add-edit-item', navigationExtras);
   }

  ngOnInit() {
  }
  ngAfterViewInit(){

  }

}
