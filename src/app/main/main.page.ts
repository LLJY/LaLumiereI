import { Component, OnInit } from '@angular/core';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginSignUpService } from '../login-sign-up.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  mainPane: CupertinoPane;
  // TODO add check if user is seller or not.
  public pages = [new NavigationComponent("Manage Listings", "manage", "edit"), new NavigationComponent("Track Orders", "trackorders", "location_on"), new NavigationComponent("Home", "", "home"), new NavigationComponent("Inbox", "inbox", "inbox"), new NavigationComponent("Liked Items", "liked", "favorite"), new NavigationComponent("Subscribed Categories", "subscribed", "list"), new NavigationComponent("Settings", "settings", "settings"), new NavigationComponent("About", "about", "info")];
  public activePageIndex = 2;
  constructor(private router: Router, private navigation: NavController, public loginService: LoginSignUpService) {

  }
  public open(){
    this.mainPane.moveToBreak('top');
  }
  ngOnInit() {
    let
     settings: CupertinoSettings = { buttonClose: false, initialBreak: "bottom", bottomClose: false, showDraggable: true, clickBottomOpen: false, breaks: { top: { enabled: true, height: 620 }, bottom: { enabled: true, height: 80 }, middle: { enabled: false } } };
    this.mainPane = new CupertinoPane('.cupertino-pane', settings);
    this.mainPane.present();
  }
  public changeRoute(routeIndex: number) {
    // ensure that we do not change routes if it is the same route
      // set the active index and navigate to the page
      this.activePageIndex = routeIndex;
      this.router.navigate([`main/${this.pages[routeIndex].route}`]);
  }

}
export class NavigationComponent {
  constructor(public title: string, public route: string, public icon: string) {

  }
}
