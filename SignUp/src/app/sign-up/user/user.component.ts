import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from "./user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})

export class UserComponent implements OnInit {

  @Input()
  signupUser: User;

  @Output()
  signupButtonEmit = new EventEmitter<User>();

  fName: string;
  lName: string;
  login: string;
  password: string;
  email: string;
  phone: string;

  emailCheck: FormControl;
  phoneCheck: FormControl;
  user: User;

  constructor() {
    this.emailCheck = new FormControl('', [Validators.email]);
    this.phoneCheck = new FormControl('',[Validators.pattern('[6-9]\\d{9}')])
    this.user = new User();
  }

  ngOnInit() {
    this.fName = this.user.firstName;
    this.lName = this.user.lastName;
    this.login = this.user.login;
    this.password = this.user.password;
    this.email = this.user.email;
    this.phone = this.user.phone;
  }

  getEmailErrorMessage() {
    return this.emailCheck.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPhoneErrorMessage() {
    return this.phoneCheck.hasError('pattern') ? 'Not a valid phone number' :
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
    if (!this.isFormEmpty() && !this.getEmailErrorMessage() &&!this.getPhoneErrorMessage()) {
      this.signupButtonEmit.emit({
        id: null,
        banReason: null,
        banExpired: null,
        firstName: this.fName,
        lastName: this.lName,
        login: this.login,
        password: this.password,
        email: this.email,
        phone: this.phone
      });
      console.log('getValues() - SUCCESS');
    }
  }
}
