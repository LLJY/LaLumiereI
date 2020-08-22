import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import {
  NavController,
  ActionSheetController,
  AlertController,
} from "@ionic/angular";
import { Item, CommonValues } from "../common-models";
import { CustomNavigationService } from "../custom-navigation.service";
import { LoginSignUpService } from "../login-sign-up.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ItemsService } from "../items.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { CropOptions, Crop } from "@ionic-native/crop/ngx";
import { File } from "@ionic-native/file/ngx";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: "app-add-edit-item",
  templateUrl: "./add-edit-item.page.html",
  styleUrls: ["./add-edit-item.page.scss"],
})
export class AddEditItemPage implements OnInit, AfterViewInit {
  public item: Item;
  public modifiedItem: Item;
  public form: FormGroup;
  private snackConfig = new MatSnackBarConfig();
  constructor(
    private customNav: CustomNavigationService,
    private loginService: LoginSignUpService,
    private fb: FormBuilder,
    public itemsService: ItemsService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private crop: Crop,
    private file: File,
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    // create the form
    this.form = fb.group({
      title: ["", [Validators.required, Validators.maxLength(18)]],
      category: ["", Validators.required],
      condition: ["", Validators.required],
      price: ["", Validators.required],
      stock: ["", Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      "payment-type": ["", Validators.required],
      "procurement-type": ["", Validators.required],
    });
    // set the default duration
    this.snackConfig.duration = 2000;
    
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
    if (this.modifiedItem.images.length < 4) {
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
    } else {
      this.snackbar.open("You can only pick 4 images!", undefined, {duration: 2000});
    }
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
        this.modifiedItem.images.push(base64);
        console.log(base64);
      })
      .catch((err) => {
        this.snackbar.open(CommonValues.errorMessage, undefined, {duration: CommonValues.snackBarDuration});
        console.error(err);
      });
  }
  /**
   * Remove image at index
   * @param index Index of image
   */
  removeImage(index: number) {
    // remove the image at 1
    this.modifiedItem.images.splice(index, 1);
  }
  /**
   * Open a confirmation dialog and ask the user if they want to remove the image.
   * @param index
   */
  deleteImage(index: number) {
    let dialogRef = this.matDialog.open(AlertDialogComponent, {
      disableClose: true,
      width: " 80%",
      height: "30%",
    });
    dialogRef.componentInstance.title = "Delete Image?";
    // dialog returns true or false based off positive and negative response.
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.removeImage(index);
      }
    });
  }
  /**
   * Activated when the back button is pressed.
   */
  onBackPressed() {
    if (this.modifiedItem == this.item) {
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
  ngOnInit() {
    this.modifiedItem = new Item(
      "",
      "",
      this.loginService.userInfo.name,
      this.loginService.userID,
      this.loginService.userInfo.ImageURL,
      0,
      new Date(),
      0,
      0,
      "",
      "",
      "",
      "",
      0,
      new Array<string>(),
      false,
      false,
      false,
      ""
    );
  }
  ngAfterViewInit() {
    // it's normal to get an error here, just try catch.
    try {
      this.item = this.router.getCurrentNavigation().extras.state.item;
    } catch (ex) {}
    // check if state exists
    if(this.item != null){
      this.modifiedItem = this.item;
    }
    
  }
  /**
   * When the user clicks the done button.
   */
  onCompleteClick() {
    console.log(`clicked! ${this.form.valid}, ${this.item == null}`)
    // check if the user has added an item.
    if (this.modifiedItem.images.length > 0) {
      // if item is null, we are adding, not editing
      if (this.item == null) {
        if (this.form.valid) {
          let dialogRef = this.matDialog.open(AlertDialogComponent, {
            disableClose: true,
            width: " 80%",
            height: "30%",
          });
          dialogRef.componentInstance.title = "Add item?";
          dialogRef.afterClosed().subscribe((value) => {
            // if positive response, add the item
            if (value) {
              this.itemsService.addItem(this.modifiedItem).then(result=>{
                if(result == "success"){
                  this.snackbar.open("Success!", undefined, this.snackConfig);
                  // go back
                  this.customNav.back();
                }else{
                  // show error message
                  this.snackbar.open(CommonValues.errorMessage, undefined, this.snackConfig);
                }
            });
          }
        });
        }else{
          this.snackbar.open("Ensure all fields are valid", undefined, this.snackConfig);
        }
      }else{
        // update item
        if (this.form.valid) {
          let dialogRef = this.matDialog.open(AlertDialogComponent, {
            disableClose: true,
            width: " 80%",
            height: "30%",
          });
          dialogRef.componentInstance.title = "Confirm Modifications?";
          dialogRef.afterClosed().subscribe((value) => {
            if (value) {
              // if positive response, update the item and freeze the inputs to indicate loading
              this.form.disable();
              this.itemsService.updateItem(this.modifiedItem).then(result=>{
                if(result == "success"){
                  this.snackbar.open("Success!", undefined, this.snackConfig);
                  // go back
                  this.customNav.back();
                }else{
                  // show error message
                  this.snackbar.open(CommonValues.errorMessage, undefined, this.snackConfig);
                }
              });
            }
          });
        }else{
          this.snackbar.open("Ensure all fields are valid", undefined, this.snackConfig);
        }
      }
    }
  }
}
