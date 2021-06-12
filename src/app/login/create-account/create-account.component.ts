import { HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpUserAuthService } from '../http-user-auth.service';
import { NewUser } from './newUser.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm: NgForm;

  errorMessage: string = "";

  newUserData: NewUser;

  constructor(private loadingSpinner: NgxSpinnerService,
    private router: Router,
    private httpUserAuthService: HttpUserAuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newUserData = this.registrationForm.value.userData;
    console.log(this.registrationForm.value.userData);
    this.loadingSpinner.show();
    this.newUserData.userName = this.newUserData.mobile;
    this.httpUserAuthService.register(this.newUserData).subscribe(
      () => {
        this.loadingSpinner.hide();
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = (<HttpErrorResponse>error).error.message;
        this.loadingSpinner.hide();
      }
    );
  }
}
