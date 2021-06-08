import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("loginForm")
  loginForm : NgForm;

  constructor(private loadingSpinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmitLogin(){
    this.loadingSpinner.show();
    setTimeout(()=>{
      this.loginForm.resetForm();
      this.loadingSpinner.hide();
    }, 3000);
  }
}
