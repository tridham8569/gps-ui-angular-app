import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm: NgForm;

  constructor(private loadingSpinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loadingSpinner.show();
    setTimeout(() => {
      this.registrationForm.resetForm();
      this.loadingSpinner.hide();
    }, 5000);
  }
}
