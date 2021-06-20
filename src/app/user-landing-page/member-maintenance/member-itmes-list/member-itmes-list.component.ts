import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GPSConstans } from 'src/app/gps-constants.service';
import { HttpUserProfileService } from '../../http-user-profile.service';
import { Member } from '../member.model';
import { MembersList } from '../members-list.model';

@Component({
  selector: 'app-member-itmes-list',
  templateUrl: './member-itmes-list.component.html',
  styleUrls: ['./member-itmes-list.component.css']
})
export class MemberItmesListComponent implements OnInit {

  membersList: [Member];
  pageActionNgxSpinnerText: string;

  constructor(private httpUserProfileService: HttpUserProfileService,
    private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.membersList = JSON.parse(localStorage.getItem(GPSConstans.GPS_LOCAL_STORAGE_MEMBERS_LIST));
    if (this.membersList === null) {
      this.getMembersList();
    }
  }

  getMembersList() {
    this.pageActionNgxSpinnerText = "Loading profiles...";
    this.ngxSpinnerService.show();
    this.httpUserProfileService.getAllMemberProfiles().subscribe(
      (response: MembersList) => {
        this.membersList = response.gpsUsersList;
        //localStorage.setItem(GPSConstans.GPS_LOCAL_STORAGE_MEMBERS_LIST, JSON.stringify(this.membersList));
        this.ngxSpinnerService.hide();
      }
    );
  }

  onToggle() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  }
}
