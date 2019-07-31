import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {User} from "../user";

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})

export class UserComponent implements OnInit {

  @Output()
  signupButtonEmit = new EventEmitter<User>();

  fName: string;
  lName: string;
  login: string;
  password: string;
  email: string;
  phone: string;

  emailForm: FormControl;
  user: User;

  constructor() {
    this.emailForm = new FormControl('', [Validators.email]);
    this.user = new User();
  }

  ngOnInit() {
    this.fName = this.user.userFname;
    this.lName = this.user.userLname;
    this.login = this.user.userLogin;
    this.password = this.user.userPassword;
    this.email = this.user.userEmail;
    this.phone = this.user.userPhone;
  }

  getEmailErrorMessage() {
    return this.emailForm.hasError('email') ? 'Not a valid email' :
        '';
  }

  isFormEmpty() {
    if (this.fName == null ||
        this.lName == null ||
        this.login == null ||
        this.password == null ||
        this.email == null ||
        this.phone == null) {
      return true;
    } else {
      return false;
    }
  }

  getValues() {
    if (!this.isFormEmpty() && !this.getEmailErrorMessage()) {
      this.signupButtonEmit.emit({
        userFname: this.fName,
        userLname: this.lName,
        userLogin: this.login,
        userPassword: this.password,
        userEmail: this.email,
        userPhone: this.phone
      });
      console.log('getValues() - SUCCESS');
    }
  }
}
