import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GPSConstans } from 'src/app/gps-constants.service';
import { HttpUserProfileService } from '../../http-user-profile.service';
import { Member } from '../member.model';
import { MembersListService } from '../members-list.service';

@Component({
  selector: 'app-member-itmes-list',
  templateUrl: './member-itmes-list.component.html',
  styleUrls: ['./member-itmes-list.component.css']
})
export class MemberItmesListComponent implements OnInit {

  membersList: Member[];
  pageActionNgxSpinnerText: string;

  constructor(private httpUserProfileService: HttpUserProfileService,
              private ngxSpinnerService: NgxSpinnerService,
              private membersListService:MembersListService) { }

  ngOnInit(): void {
    this.membersList = this.membersListService.getMembersList();
    if (this.membersListService.getMembersList() === undefined) {
      this.getMembersList();
    }else{
      const currentTime = new Date();
      const loadTime = this.membersListService.getLoadTime();
      if((currentTime.getTime()-loadTime.getTime()) < 600000){
        this.membersList = this.membersListService.getMembersList();
      }else{
        this.getMembersList();
      }
    }
  }

  getMembersList() {
    this.pageActionNgxSpinnerText = "Loading profiles...";
    this.ngxSpinnerService.show();
    this.httpUserProfileService.getAllMemberProfiles().subscribe(
      (response) => {
        this.membersList = response.gpsUsersList;
        this.membersListService.setMembersList(this.membersList, new Date());
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
