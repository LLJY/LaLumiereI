import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { trigger, transition, style, animate } from "@angular/animations";
import { LoginSignUpService } from "../login-sign-up.service";
import { LoadingController } from "@ionic/angular";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    trigger("slide-login", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("400ms ease-in", style({ transform: "translateX(0%)" })),
      ]),
      transition(":leave", [
        animate("400ms ease-out", style({ transform: "translateX(100%)" })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LoginSignUpService,
    public loadingController: LoadingController,
    private snackbar: MatSnackBar,
    private ngZone: NgZone,
  ) {
    this.form = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  public toSignUp() {
    this.router.navigate(["login-sign-up/signup"]);
  }
  public login() {
    // enable the loading screen
    this.isLoading = true;
    this.service
      .login(this.form.get("email").value, this.form.get("password").value)
      .then((result) => {
        // stop loading when the result is shown
        this.isLoading = false;
        if (result != "error") {
          this.router.navigate(["main/home"]);
        } else {
          // open the snackbar in the ngzone, otherwise it may not work
          this.ngZone.run(() => {
            this.snackbar.open("An error has occured", undefined, {
              duration: 2000,
            });
          });
        }
      });
  }
  /**
   * Login with google.
   */
  public loginGoogle() {
    this.isLoading = true;
    this.service.loginWithCredentials().then((result) => {
      // stop loading when the result is shown
      if (result == "success") {
        this.isLoading = false;
        this.router.navigate(["main/home"]);
      } else {
        this.ngZone.run(() => {
          this.isLoading = false;
          this.snackbar.open("An error has occured", undefined, {
            duration: 2000,
          });
        });
      }
    });
  }
}
