import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUser } from '../loggedInUser.model';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css']
})
export class UserLandingPageComponent implements OnInit {

  loggedInUser: LoggedInUser;

  fullName: string;
  userProfilePic: string;
  defaultPics = { male: 'assets/img/profilePics/default_male.svg', female: 'assets/img/profilePics/default_female.svg' };

  constructor(private router: Router, private route: ActivatedRoute) {
    this.onToggle();
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.validateLocalStorageLogin();
    this.setProfile();
  }

  onToggle() {
    jquery("body").toggleClass("sidebar-toggled");
    jquery(".sidebar").toggleClass("toggled");
    if (jquery(".sidebar").hasClass("toggled")) {
      jquery('.sidebar .collapse').collapse('hide');
    };
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  setProfile() {
    this.fullName = this.loggedInUser.gpsUser.firstName + " " + this.loggedInUser.gpsUser.lastName;
    this.userProfilePic = this.loggedInUser.gpsUser.gender == 'male' ? this.defaultPics.male : this.defaultPics.female;
  }

  validateLocalStorageLogin() {
    if (this.loggedInUser === null || this.loggedInUser.gpsUser.userName !== this.route.snapshot.params['id']) {
      this.logOut();
    }
  }
}
