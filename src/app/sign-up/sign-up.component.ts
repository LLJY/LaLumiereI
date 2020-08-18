import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginSignUpService } from '../login-sign-up.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations:[
    trigger('slide-signup',[
      transition(':enter',[
        style({transform: 'translateX(-100%)'}),
        animate('400ms ease-in',style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave',[
        animate('400ms ease-out',style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {
  public form : FormGroup
  isLoading = false;
  // these are the variables to hide/unhide the password
  public hide = true;
  public hidePassword = true;
  constructor(private fb: FormBuilder, private service: LoginSignUpService, private router: Router, private snackbar: MatSnackBar) { 
    // setup reactive forms
    let passwordValidator = ["", [Validators.required, Validators.minLength(8)]];
    this.form = fb.group({
      "email" : ["", [Validators.required, Validators.email]],
      "username" : ["", Validators.required],
      "name": ["", Validators.required],
      "password" : passwordValidator,
      "passwordRepeat": passwordValidator,
      "sellerApply" : [false, Validators.required],
      "isAgree" : [false, Validators.requiredTrue]
    });
  }
  public signup(){
    this.isLoading = true;
    this.service.signUp(this.form.get("email").value, this.form.get("password").value, this.form.get("username").value, this.form.get("name").value).then(result=>{
      if(result != "success"){
        // result has a descriptive error message
        this.isLoading = false;
        this.snackbar.open(result, null, {duration: 2000});
      }else{
        this.isLoading = false;
        this.backToLogin();
      }
    });
  }
  public backToLogin(){
    this.router.navigate(['login-sign-up/login'])
  }
  ngOnInit() {}

}
