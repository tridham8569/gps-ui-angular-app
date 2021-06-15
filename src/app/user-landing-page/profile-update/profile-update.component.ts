import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  imageSrc: string;
  profilePicUploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private httpUserProfileService: HttpUserProfileService,
    private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
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
    this.ngxSpinnerService.show();
    const writer = new WritableStream();
    writer.getWriter
    setTimeout(() => {
      this.pageActionNgxSpinnerText = "Uploading....";
      console.log(this.profilePicUploadForm.value);
      this.ngxSpinnerService.hide();
    }, 1);
  }

}
