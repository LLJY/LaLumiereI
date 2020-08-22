import { Component, OnInit } from "@angular/core";
import { LoginSignUpService } from "../login-sign-up.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { User, CommonValues } from "../common-models";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { NavController, ActionSheetController } from "@ionic/angular";
import { CustomNavigationService } from "../custom-navigation.service";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"],
})
export class UserPage implements OnInit {
  public imageBase64: string;
  public modifiedUser: User;
  public form: FormGroup;
  public userFormChecked = true;
  public snackConfig = new MatSnackBarConfig();
  constructor(
    public loginService: LoginSignUpService,
    public fb: FormBuilder,
    private matDialog: MatDialog,
    private snackbar: MatSnackBar,
    private navController: NavController,
    private customNav: CustomNavigationService,
    private camera: Camera,
    private file: File,
    private actionSheetController: ActionSheetController,
    private crop: Crop
  ) {
    // use modified user to avoid directly modifying user info, which should be updated by a listener.
    this.modifiedUser = loginService.userInfo;
    // create the reactive form
    this.form = fb.group({
      username: ["", [Validators.required, this.noWhitespaceValidator]],
      name: ["", Validators.required],
      // about is optional.
    });
    this.snackConfig.duration = 2000;
  }

  ngOnInit() {}
  updateUser() {
    if (this.form.valid) {
      let dialogRef = this.matDialog.open(AlertDialogComponent, {
        disableClose: true,
        width: " 80%",
        height: "30%",
      });
      dialogRef.componentInstance.title = "Confirm Changes?";
      dialogRef.afterClosed().subscribe((value) => {
        if (value) {
          // if positive response, update the item and freeze the inputs to indicate loading
          this.form.disable();
          this.loginService.updateUser(this.modifiedUser, this.imageBase64).then((result) => {
            if (result == "success") {
              this.snackbar.open("Success!", undefined, this.snackConfig);
              // go back
              this.customNav.back();
            } else {
              // show error message
              this.snackbar.open(
                CommonValues.errorMessage,
                undefined,
                this.snackConfig
              );
            }
          });
        }
      });
    } else {
      this.snackbar.open(
        "Ensure all fields are valid",
        undefined,
        this.snackConfig
      );
    }
  }
  /**
   * signs the user out
   */
  signOut() {
    let dialogRef = this.matDialog.open(AlertDialogComponent, {
      disableClose: true,
      width: " 80%",
      height: "30%",
    });
    dialogRef.componentInstance.title = "Logout?";
    dialogRef.afterClosed().subscribe((value) => {
      // if positive result, signout
      if (value) {
        this.loginService
          .signOut()
          .then((result) => {
            // kick the user out.
            this.snackbar.open("Success!", undefined, this.snackConfig);
            this.navController.navigateRoot(["/login-sign-up/login"]);
          })
          .catch((error) => {
            console.error(error.toString());
            this.snackbar.open(
              CommonValues.errorMessage,
              undefined,
              this.snackConfig
            );
          });
      }
    });
  }
  /**
   * Opens either the gallery or camera to get the picture
   * @param sourceType source type, pick file or camera
   */
  pickImage(sourceType: number) {
    // configure the cmaera options
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.cropImage(imageData);
      },
      (err) => {
        // Handle error
        console.error(err);
      }
    );
  }
  /**
   * Creates an action sheet to take from camera or load from library
   */
  selectImage = async () => {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [
          {
            text: "Load from Library",
            handler: () => {
              this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            },
          },
          {
            text: "Use Camera",
            handler: () => {
              this.pickImage(this.camera.PictureSourceType.CAMERA);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      });
      await actionSheet.present();
  };

  cropImage(imageData) {
    // 92 is the standard JPEG quality on Android.
    let cropOptions: CropOptions = {
      quality: 92,
    };
    this.crop
      .crop(imageData, cropOptions)
      .then((result) => {
        // not sure what this split is for, just following the documentation
        this.addImage(result.split("?")[0]);
      })
      .catch((err) => {
        // TODO SHOW SNACKBAR
        console.error(err);
      });
  }
  addImage(imagePath) {
    // get the file's url
    let copyPath = imagePath;
    let splitPath = copyPath.split("/");
    let imageName = splitPath[splitPath.length - 1];
    let filePath = imagePath.split(imageName)[0];
    // convert the file to base64 and add it to the array.
    this.file
      .readAsDataURL(filePath, imageName)
      .then((base64) => {
        this.imageBase64 = base64
        console.log(base64);
      })
      .catch((err) => {
        // TODO SHOW SNACKBAR ERROR
        console.error(err);
      });
  }
  /**
   * Activated when the back button is pressed.
   */
  onBackPressed() {
    // if the user has changed, ask if the user wants to leave.
    if (this.modifiedUser == this.loginService.userInfo) {
      this.customNav.back();
    } else {
      let dialogRef = this.matDialog.open(AlertDialogComponent, {
        disableClose: true,
        width: " 80%",
        height: "30%",
      });
      dialogRef.componentInstance.title = "Abandon your changes?";
      dialogRef.afterClosed().subscribe((value) => {
        if (value) {
          this.customNav.back();
        }
      });
    }
  }
  /**
   * Validates if there is whitespace
   * @param control the formcontrol
   */
  public noWhitespaceValidator(control: FormControl) {
    // if there is something to trim, mark it as invalid
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    // if is valid, return null, otherwise, set whitespace to true
    return isValid ? null : { whitespace: true };
  }
  /**
   * Disabled or enables editing of the form.
   * @param enabled
   */
  enableUserForm(enabled: boolean) {
    // ternary statement to enable or disable the button
    enabled ? this.form.enable() : this.form.disable();
  }
}
