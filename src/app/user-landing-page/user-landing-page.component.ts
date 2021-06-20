import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggedInUserService } from '../logged-in-user.service';
import { LoggedInUser } from '../loggedInUser.model';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css']
})
export class UserLandingPageComponent implements OnInit {

  loggedInUserSubscription:Subscription;
  loggedInUser: LoggedInUser;

  //userProfilePic: string;
  defaultPics = { male: 'assets/img/profilePics/default_male.svg', female: 'assets/img/profilePics/default_female.svg' };

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private loggedInUserService:LoggedInUserService) {
    this.onToggle();
  }

  ngOnInit(): void {
    this.onToggle();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.loggedInUserSubscription = this.loggedInUserService.loggedInUserSubject.subscribe(
      (data) =>{
          this.loggedInUser = data;
      }
    );
    this.validateLocalStorageLogin();
    this.setProfile();
  }

  onToggle() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  setProfile() {
    if(this.loggedInUser.gpsUsers.profilePic === undefined || this.loggedInUser.gpsUsers.profilePic === null){
      this.loggedInUser.gpsUsers.profilePic  = this.loggedInUser.gpsUsers.gender == 'male' ? this.defaultPics.male : this.defaultPics.female;
    }
  }

  validateLocalStorageLogin() {
     if (this.loggedInUser === null || this.loggedInUser.gpsUsers.userName !== this.route.snapshot.params['id']) {
       this.logOut();
     }
  }

  navigateToAllMembersList(){
    this.onToggle();
    this.router.navigate(['/',this.loggedInUser.gpsUsers.userName,'allMembersList']);
  }
}
