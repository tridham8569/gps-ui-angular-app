import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggedInUser } from '../loggedInUser.model';

import { HttpUserAuthService } from './http-user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:string="";
  loggedInUser: LoggedInUser;

  constructor(private loadingSpinner: NgxSpinnerService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private httpUserAuthService: HttpUserAuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('loggedInUser') != null) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (this.route.snapshot.params['id'] === this.loggedInUser.gpsUser.userName) {
        this.router.navigate(['/' + this.loggedInUser.gpsUser.userName]);
      }
    }
  }

  onSubmitLogin(loginForm: NgForm) {
    this.loadingSpinner.show();
    this.httpUserAuthService.login(loginForm.value.phoneNumber, loginForm.value.password).subscribe(
      () => {
        this.loadingSpinner.hide();
        this.router.navigate(['/' + loginForm.value.phoneNumber]);
      },
      (error) => {
        this.loadingSpinner.hide();
        if ((<HttpErrorResponse>error).error.message === 'Bad Credentials') {
          this.errorMessage = (<HttpErrorResponse>error).error.message;
        } else {
          //navigate to global error page with message
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
