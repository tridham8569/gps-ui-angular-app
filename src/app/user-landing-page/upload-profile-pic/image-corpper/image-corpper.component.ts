import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Cropper from "cropperjs";
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { LoggedInUserService } from 'src/app/logged-in-user.service';
import { LoggedInUser } from 'src/app/loggedInUser.model';
import { HttpUserProfileService } from '../../http-user-profile.service';
import { UploadedImageService } from '../uploaded-image.service';


@Component({
  selector: 'app-image-corpper',
  templateUrl: './image-corpper.component.html',
  styleUrls: ['./image-corpper.component.css']
})
export class ImageCorpperComponent implements OnInit {

  @ViewChild("image", { static: false })
  imageElement: ElementRef;

  @Input("src")
  imageSource: string = "";

  imageDestination: string;
  cropper: Cropper;

  loggedInUser:LoggedInUser;

  pageActionNgxSpinnerText:string;

  constructor(private router:Router, 
              private imageService:UploadedImageService,
              private ngxSpinner:NgxSpinnerService,
              private httpUserProfileService: HttpUserProfileService,
              private loggedInUserService:LoggedInUserService) { }

  ngOnInit(): void {
     this.imageSource = this.imageService.getImage();
     this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }
  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = canvas.toDataURL("image/png");
      }
    });
  }

  uploadImage(){
    this.pageActionNgxSpinnerText = "Uploading....";
    this.ngxSpinner.show();
    const formData = new FormData();
    this.httpUserProfileService.uploadProfilePicInBody(this.loggedInUser.gpsUsers.userName, this.imageDestination).subscribe(
      (response) => {
        this.loggedInUser.gpsUsers.profilePic = this.imageDestination;
        this.loggedInUserService.setLoggedInUser(this.loggedInUser);
        this.ngxSpinner.hide();
        this.router.navigate(["/",this.loggedInUser.gpsUsers.userName]);
      }
    );
  }
}
