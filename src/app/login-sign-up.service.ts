import { Injectable } from "@angular/core";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { AngularFireFunctions } from "@angular/fire/functions";
import { User } from "./common-models";
import { async } from "rxjs/internal/scheduler/async";
@Injectable({
  providedIn: "root",
})
export class LoginSignUpService {
  public userID: any = null;
  public userInfo: User;
  constructor(
    private firebase: FirebaseX,
    private functions: AngularFireFunctions
  ) {
    firebase.signOutUser();
  }
  /**
   * Checks if the user is logged in, returns a boolean promise
   */
  public isLoggedIn = async (): Promise<boolean> => {
    try {
      var id: any = await this.firebase.getCurrentUser();
      this.userID = id.uid;
      // get the user indo with the userID
      await this.getUserInfo();
      return true;
    } catch (ex) {
      return false;
    }
  };
  /**
   * Signs up user using email and password, profile picture is automatically assigned for now
   * @param email user provided email
   * @param password user provided password
   * @param username user provided username
   */
  public signUp = async (
    email: string,
    password: string,
    username: string,
    fullName: string
  ): Promise<string> => {
    try {
      // call cloud functions' signup
      const request = this.functions.httpsCallable("signUp");
      let result = await request({
        email,
        password,
        username,
        fullName,
      }).toPromise();
      this.userID = result;
      return "success";
    } catch (err) {
      return err.toString();
    }
  };
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
  };
  /**
   * gets the user info automatically, does not return anything
   */
  public getUserInfo = async () => {
    const request = this.functions.httpsCallable("getUserInfo");
    this.userInfo = await request({ userID: this.userID }).toPromise();
    console.log(this.userInfo);
  };
  /**
   * Updates user information, returns promise.
   * @param user user object
   */
  public updateUser = async(user: User, imageBase64?: string) => {
    const request = this.functions.httpsCallable("updateUser");
    let sent = request({ userID: this.userID, user: user, base64:imageBase64, token: (await this.firebase.getToken()) }).toPromise();
    sent.then(result=>{
      // get the user info all over again when updated.
      this.isLoggedIn();
    });
    return sent;
  };
  /**
   * Signs the user out
   */
  public signOut = () => {
    return this.firebase.signOutUser();
  };
  public async loginWithCredentials() {
    try {
      // result is the login credential
      let result = await this.firebase.authenticateUserWithGoogle(
        "8046173692-8q0qt2sbpps9o976hkdgd26eejaq0gs6.apps.googleusercontent.com"
      );
      let signIn = await this.firebase.signInWithCredential(result);
      // call the backend signup, it will figure out if the user is new or not, we don't care.
      const request = this.functions.httpsCallable("signUp");
      let signupResult = await request({
        userID: (await this.firebase.getCurrentUser() as any).uid,
      }).toPromise();
      this.userID = result;
      await this.isLoggedIn();
      return "success";
    } catch (err) {
      console.error(err);
    }
  }
}
