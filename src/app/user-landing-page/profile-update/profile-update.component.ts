import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggedInUserService } from 'src/app/logged-in-user.service';
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

  pageActionNgxSpinnerText: string;

  @ViewChild('profileUpdateForm')
  profileUpdateForm: NgForm;

  constructor(private httpUserProfileService: HttpUserProfileService,
    private ngxSpinnerService: NgxSpinnerService,
    private loggedInUserService:LoggedInUserService) { }

  ngOnInit(): void {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }

  updateProfile() {
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
        this.ngxSpinnerService.hide();
        this.errorMessage = "Updated Succesfully"
        this.loggedInUserService.setLoggedInUser(this.loggedInUser);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.ngxSpinnerService.hide();
      }
    );
  }
}
