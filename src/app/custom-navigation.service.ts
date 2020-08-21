import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
/** This service provides methods to route back and forth, knowing the current and previous route.
 * This helps to circumvent the issue of ionic using window.location.back, instead of angular's router, which causes the application
 * to reload completely and break the SPA. Fix your shit ionic, for fucks sake.
 */
export class CustomNavigationService {
  private routeHistory = new Array<string>();
  private prevRoute = "/main";
  private currentRoute = "/main";
  constructor(private navController: NavController, private router: Router) {
    // if the router changes because of user navigation, update the current route
    router.events.subscribe(result=>{
      this.currentRoute = router.url;
    });
   }
   private changeRouteNoNavigate(route: string){
    this.routeHistory.pop();
    this.currentRoute = route;
   }
   /**
    * Uses ionic's NavController to go forward and stores the navigation history in the service.
    * PLEASE use this exclusively if not it may have unintended side effects
    * @param route route to navigate to
    * @param extras navigation extras (data)
    */
   public forward(route: string, extras?: NavigationExtras){
     // the current route is now history
     this.routeHistory.push(this.router.url);
     this.currentRoute = route;
     // if extras exist, navigate with it.
     if(extras){
      this.navController.navigateForward(this.currentRoute, extras);
     }else{
      this.navController.navigateForward(this.currentRoute);
     }
    
   }
   /**
    * Move to the previous route. Uses NavController.navigateBack()
    */
   public back(){
     if(this.routeHistory.length > 0){
       // remove the last item and navigate to it, lol this is like the most perfect application for array.pop()
      this.currentRoute = this.routeHistory.pop();
      this.navController.navigateBack(this.currentRoute);
     }

   }
   /**
    * Remove the backstack, unlike the one from ionic, this one actually works.
    */
   public popBackStack(){
     this.routeHistory = new Array<string>();
   }
}
