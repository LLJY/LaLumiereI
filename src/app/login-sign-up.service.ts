import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import * as admin from 'firebase-admin';
import { async } from '@angular/core/testing';
import { FirebaseApp } from '@angular/fire';
@Injectable({
  providedIn: 'root'
})
export class LoginSignUpService {
  public userID: any = null;
  constructor(private firebase: FirebaseX) {
    firebase.signOutUser();
  }
  /**
   * Checks if the user is logged in, returns a boolean promise
   */
  public isLoggedIn = async (): Promise<boolean> => {
    try {
      var id: any = await this.firebase.getCurrentUser();
      this.userID = id.uid;
      console.log(this.userID);
      return true;
    } catch (ex) {
      return false;
    }
  }
  /**
   * Signs up user using email and password, profile picture is automatically assigned for now
   * @param email user provided email
   * @param password user provided password
   * @param username user provided username
   */
  public signUp = async (email: string, password: string, username: string, fullName:string): Promise<string> => {
    try {
      await this.firebase.createUserWithEmailAndPassword(email, password);
      // set a default profile uri
      await this.firebase.updateUserProfile({ name: username, photoUri: "https://www.clipartmax.com/png/full/171-1717870_prediction-clip-art.png" });
      await this.firebase.signOutUser();
      return "success";
    } catch (err) {
      return err.toString();
    }
  }
  /**
   * Login using firebase authentication with email and password
   * @param email user provided email
   * @param password user provided password
   */
  public login = async (email: string, password: string) => {
    try {
      await this.firebase.signInUserWithEmailAndPassword(email, password);
      await this.isLoggedIn();
      return "success";
    } catch (err) {
      console.log(JSON.stringify(err.toString()));
      return "error";
    }
  }
  public getUserInfo = async () => {
    // TODO  implement this in firebase functions
  }
}
