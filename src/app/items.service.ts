import { Injectable } from '@angular/core';
import { Item, sleep } from './common-models';
import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginSignUpService } from './login-sign-up.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  // selected item for the individual item
  public selectedItem: Item;
  public hotItems: Array<Item>;
  public followItems: Array<Item>;
  public interestItems: Array<Item>;
  public categories: string[];
  public apiUrl = "https://asia-east2-la-lumire.cloudfunctions.net";
  private defaultHeaders = new HttpHeaders({
    "content-type": undefined
  });
  constructor(private http: HttpClient, private loginService: LoginSignUpService,) {
    this.defaultHeaders.delete("content-type");
  }
  /**
   * Get items is responsible for getting itemsServiceall the items for the homescreen
   * hot items, following items and interest items
   * it also gets the categories.
   */
  getItems = async()=>{
    await this.getHotItems();
    await this.getCategories();
    await this.getFollowItems();
    await this.getInterestItems();
  }
  getHotItems = async()=>{
    let unProcessed = await this.http.get(`${this.apiUrl}/getHottestItems`).toPromise();
    console.log(unProcessed);
    this.hotItems = this.processItemJson(unProcessed);
  }
  // a function that serializes json into an item.
  processItemJson(jsonArray: any): Item[]{
    let items = new Array<Item>();
    jsonArray.forEach(json => {
      items.push(new Item(json.ListingID, json.Title, json.sellerName, json.sellerUID, json.sellerImageURL, json.Likes, new Date(json.ListedTime), json.Price, json.Rating, json.Description, json.TransactionInformation, json.ProcurementInformation, json.Category, json.Stock, json.Images, json.isAdvert, json.isUsed, json.location));
    });
    return items;
  }
  // INCOMPLETE, needs uid
  getFollowItems = async()=>{
    let formData = new FormData();
    formData.append("userID", "Gb8gHL9u9nM92gPmeeXv7C6QC3l2");
    let unProcessed = await this.http.post(`${this.apiUrl}/getItemByFollowed`, formData).toPromise();
    this.hotItems = this.processItemJson(unProcessed);
  }
  // INCOMPLETE, needs uid
  getInterestItems = async()=>{
    let formData = new FormData();
    formData.append("userID", "Gb8gHL9u9nM92gPmeeXv7C6QC3l2");
    let unProcessed = await this.http.post(`${this.apiUrl}/getItemBySuggestion`, formData).toPromise();
    this.hotItems = this.processItemJson(unProcessed);
  }
  getCategories = async()=>{
    let categories: any = await this.http.get(`${this.apiUrl}/getCategories`).toPromise();
    categories.sort();
    this.categories = categories;
  }

}
