import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, Input, OnInit, Output, SystemJsNgModuleLoader, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GPSConstans } from 'src/app/gps-constants.service';
import { LoggedInUser } from 'src/app/loggedInUser.model';
import { HttpUserProfileService } from '../http-user-profile.service';


@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  loggedInUser: LoggedInUser;

  fullName: string;
  errorMessage: string;

  pageActionNgxSpinnerText:string;

  @ViewChild('profileUpdateForm')
  profileUpdateForm: NgForm;

  uploadMessage:string = "";
  
  @Output('userProfilePic')
  landingPageProfilePic:string;

  imageSrc: string;
  profilePicUploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private httpUserProfileService: HttpUserProfileService,
    private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.imageSrc = this.loggedInUser.gpsUsers.profilePic;
  }

  updateProfile() {
    console.log(this.profileUpdateForm);
    this.pageActionNgxSpinnerText = "Updating....";
    this.ngxSpinnerService.show();
    this.httpUserProfileService.updateProfileDetails(this.loggedInUser).subscribe(
      (response: {
        userName: string;
        firstName: string;
        lastName: string;
        mobile: string;
        gender: string;
        email?: string;
        address?: string;
      }) => {
        this.loggedInUser.gpsUsers = response;
        localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
        this.ngxSpinnerService.hide();

      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.ngxSpinnerService.hide();
      }
    );
  }


  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.profilePicUploadForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  upload(){
    this.pageActionNgxSpinnerText = "Uploading....";
    this.ngxSpinnerService.show();
    const formData = new FormData();
    this.httpUserProfileService.uploadProfilePicInBody(this.loggedInUser.gpsUsers.userName, this.imageSrc).subscribe(
      (response) => {
        this.loggedInUser.gpsUsers.profilePic = this.imageSrc;
        localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
        this.uploadMessage = "Uploaded Successfully";
        this.landingPageProfilePic = this.imageSrc;
        console.log(this.imageSrc);
        this.ngxSpinnerService.hide();
      }
    );
  }

}
