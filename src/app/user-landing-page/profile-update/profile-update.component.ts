import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { LoggedInUser } from 'src/app/loggedInUser.model';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  loggedInUser: LoggedInUser;
  fullName: string;

  @ViewChild('profileUpdateForm')
  profileUpdateForm:NgForm;

  constructor(private ngxLoadingSpinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.prePopulateDefails();
  }

  updateProfile(){
    this.ngxLoadingSpinner.show();
    setTimeout(() => {
      console.log(this.profileUpdateForm);
      this.ngxLoadingSpinner.hide();
    }, 1000);
  }

  prePopulateDefails(){
    this.ngxLoadingSpinner.show();
    this.fullName = this.loggedInUser.gpsUser.firstName+' '+this.loggedInUser.gpsUser.lastName;
    this.ngxLoadingSpinner.hide();
    // this.profileUpdateForm.value.profileData.p_firstName = this.loggedInUser.gpsUser.firstName;
    // this.profileUpdateForm.value.profileData.p_lastName = this.loggedInUser.gpsUser.lastName;
    // this.profileUpdateForm.value.profileData.p_mobile = this.loggedInUser.gpsUser.mobile;
    
  }
}
