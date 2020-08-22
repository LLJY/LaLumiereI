import { Injectable, NgZone } from "@angular/core";
import { Item, sleep } from "./common-models";
import { async } from "@angular/core/testing";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginSignUpService } from "./login-sign-up.service";
import { AngularFireFunctions } from "@angular/fire/functions";
import { NavigationExtras } from "@angular/router";
import { NavController, LoadingController } from "@ionic/angular";
import { CustomNavigationService } from "./custom-navigation.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  // selected item for the individual item
  public selectedItem: Item;
  public hotItems: Array<Item>;
  public followItems: Array<Item>;
  public interestItems: Array<Item>;
  public likedItems: Array<Item>;
  public sellerItems: Array<Item>;
  public categories: string[];
  public paymentTypes: string[];
  public procurementTypes: string[];
  //private userID = "Gb8gHL9u9nM92gPmeeXv7C6QC3l2";
  private defaultHeaders = new HttpHeaders({
    "content-type": undefined,
  });
  constructor(
    private http: HttpClient,
    private loginService: LoginSignUpService,
    private functions: AngularFireFunctions,
    private customNav: CustomNavigationService,
    private fireStorage: AngularFirestore,
    private ngZone: NgZone,
    private snackbar: MatSnackBar,
    private loadingController: LoadingController
  ) {
    this.defaultHeaders.delete("content-type");
    // when the snapshot updates, update the items as well.
    this.fireStorage.collectionGroup("Items").snapshotChanges().subscribe(change=>{
      this.getHotItems();
      this.getCategories();
      this.getFollowItems();
    });
    this.fireStorage.collectionGroup("Categories").snapshotChanges().subscribe(change=>{
      this.getCategories();
    });
  }
  /**
   * opens the page with the item
   * @param item
   */
  public openItemPage = (item: Item) => {
    let navigationExtras: NavigationExtras = { state: { item: item } };
    this.customNav.forward("/individual-item", navigationExtras);
  };
  /**
   * Get items is responsible for getting itemsService all the items for the homescreen
   * hot items, following items and interest items
   * it also gets the categories, payment types and procurement types for later use
   */
  getItems = async () => {
    // get everything and use promises.all to wait for all of them
    let promises = new Array<Promise<any>>();
    promises.push(this.getHotItems());
    promises.push(this.getCategories());
    promises.push(this.getFollowItems());
    promises.push(this.getInterestItems());
    promises.push(this.getPaymentTypes());
    promises.push(this.getProcurementTypes());
    await Promise.all(promises);
  };
  getHotItems = async () => {
    let request = this.functions.httpsCallable("getHottestItems");
    // this function does not take data
    let unProcessed = await request({}).toPromise();
    //console.log(unProcessed);
    this.hotItems = this.processItemJson(unProcessed);
  };
  /**
   * Serializes the item json into array of items
   * @param jsonArray items json
   */
  processItemJson(jsonArray: any): Item[] {
    let items = new Array<Item>();
    jsonArray.forEach((json) => {
      items.push(
        new Item(
          json.ListingID,
          json.Title,
          json.sellerName,
          json.sellerUID,
          json.sellerImageURL,
          json.Likes,
          new Date(json.ListedTime),
          json.Price,
          json.Rating,
          json.Description,
          json.TransactionInformation,
          json.ProcurementInformation,
          json.Category,
          json.Stock,
          json.Images,
          json.isAdvert,
          json.userLiked,
          json.isUsed,
          json.Location
        )
      );
    });
    return items;
  }
  /**
   * Get the items of the users that the user follows
   */
  getFollowItems = async () => {
    let addMessage = this.functions.httpsCallable("getItemByFollowed");
    let unProcessed = await addMessage({
      userID: this.loginService.userID,
    }).toPromise();
    this.followItems = this.processItemJson(unProcessed);
  };
  /**
   * Get suggested items by the backend
   */
  getInterestItems = async () => {
    // i will only comment this one. Call the cloud function.
    let request = this.functions.httpsCallable("getItemBySuggestion");
    // Send the cloud function the needed parameters amd await the function after converting it to a promise
    let unProcessed = await request({
      userID: this.loginService.userID,
    }).toPromise();
    // serialize the item into a usable object and assign it to the respective arrays.
    this.interestItems = this.processItemJson(unProcessed);
  };
  /**
   * Get all the categories
   */
  getCategories = async () => {
    let request = this.functions.httpsCallable("getCategories");
    let categories: any = await request({}).toPromise();
    categories.sort();
    this.categories = categories;
  };
  /**
   * Get all the items the seller is managing
   */
  getManagedItems = async () => {
    let request = this.functions.httpsCallable("getSellerItems");
    let unProcessed = await request({
      userID: this.loginService.userID,
    }).toPromise();
    this.sellerItems = this.processItemJson(unProcessed);
  };
  /**
   * Get procurement types, delivery, etc
   */
  getProcurementTypes = async () => {
    let request = this.functions.httpsCallable("getProcurementTypes");
    let procurementTypes: any = await request({}).toPromise();
    procurementTypes.sort();
    this.procurementTypes = procurementTypes;
  };
  /**
   * Get payment types, paylah, transfer, cash ,etc
   */
  getPaymentTypes = async () => {
    let request = this.functions.httpsCallable("getPaymentTypes");
    let paymentTypes: any = await request({}).toPromise();
    paymentTypes.sort();
    this.paymentTypes = paymentTypes;
  };
  public addItem = async (item: Item) => {
    try {
      // TODO  implement this in firebase functions
      const request = this.functions.httpsCallable("addItem");
      return request({
        userID: this.loginService.userID,
        item: item,
      }).toPromise();
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  };
  /**
   * Calls the update function from firebase, currently does not support update images
   * @param item item object
   */
  public updateItem = async (item: Item) => {
    try {
      // TODO  implement this in firebase functions
      const request = this.functions.httpsCallable("updateItem");
      return request({
        userID: this.loginService.userID,
        item: item,
      }).toPromise();
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  };
  /**
   * Delete the item
   * @param item item to delete
   */
  public deleteItem = async (item: Item) => {
    try {
      const request = this.functions.httpsCallable("deleteItem");
      return request({
        userID: this.loginService.userID,
        item: item,
      }).toPromise();
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  };
  /**
   * Like an item
   * @param item item to like
   */
  public likeItem = async (item: Item) => {
    try {
      const request = this.functions.httpsCallable("likeItem");
      return request({
        userID: this.loginService.userID,
        itemID: item.listingId,
      }).toPromise();
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  };
  /**
   * UnLike an item
   * @param item item to unlike
   */
  public unLikeItem = async (item: Item) => {
    try {
      const request = this.functions.httpsCallable("likeItem");
      return request({
        userID: this.loginService.userID,
        itemID: item.listingId,
      }).toPromise();
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  };
  /**
   * Get items liked by the user.
   */
  getLikedItems = async () => {
    let addMessage = this.functions.httpsCallable("getLikedItems");
    let unProcessed = await addMessage({
      userID: this.loginService.userID,
    }).toPromise();
    this.likedItems = this.processItemJson(unProcessed);
  };
/**
 * Opens more items page with the selected category
 * @param category Selected category
 */
  openCategoryItemsPage = async(category: string)=>{
    // in other news why the fuck do i have to await a function meant for showing during async functions????
    let loading = (await this.loadingController.create({message: "Loading..."}));
    loading.present();
    let request = this.functions.httpsCallable("getItemsByCategory");
    let unProcessed = await request({
      userID: this.loginService.userID,
      category: category
    }).toPromise();
    let categoryItems = this.processItemJson(unProcessed);
    // run this in ngZone because we are in an async function
    this.ngZone.run(zone=>{
      loading.dismiss();
      if(categoryItems.length > 0){
        this.customNav.forward('/more-items', {state: {title: category, items: categoryItems}});
      }else{
        this.snackbar.open("Sorry! No items found!", undefined, {duration: 2000});
      }
    });
    
  }
}
