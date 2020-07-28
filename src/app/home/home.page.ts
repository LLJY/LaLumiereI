import { Component } from '@angular/core';
import { LoginSignUpService } from '../login-sign-up.service';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { LoadingDialogService } from '../loading-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private LoadingDialog: HTMLIonLoadingElement;
  constructor(private loginService: LoginSignUpService, private router: Router, private loadingController: LoadingController, private navController: NavController) {
    loadingController.create(
      {
        message: "Please Wait...",
        duration: 5000
      }
    ).then(result => {
      console.log(result);
      this.LoadingDialog = result;
        result.present().then(() => {
          loginService.isLoggedIn().then(loggedIn => {
            result.remove();
            // if user is not logged in, redirect to login/signup page.
            console.log(loggedIn);
            if (!loggedIn) {
              router.navigate(['login-sign-up/login']);
            }else{
              navController.navigateForward('main').then(result=>{
                //pop the backstack after animating the page
                
              });
            }
          });
        });
    })
  }
  async getLoadingDialog() {
    return await this.loadingController.create({
      message: 'Please wait...',
    });
  }

}
