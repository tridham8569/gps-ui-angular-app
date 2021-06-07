import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm : NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    alert('Account will be created with below details : \n' 
            +this.registrationForm.value.firstName+'\n'
            +this.registrationForm.value.lastName+'\n'
            +this.registrationForm.value.email);
    this.registrationForm.reset;
  }
}
