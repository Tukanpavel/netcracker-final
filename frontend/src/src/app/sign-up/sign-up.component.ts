import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from "./user";
import {AppRoutingModule} from "../app-routing.module";
import {HttpService} from "../services/http.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  fName: string;
  lName: string;
  login: string;
  password: string;
  email: string;
  phone: string;

  emailCheck: FormControl;
  phoneCheck: FormControl;
  loginCheck: FormControl;

  isClicked: boolean;

  private theUser: User;

  constructor(private httpService: HttpService, private router: AppRoutingModule, private _snackBar: MatSnackBar) {
    this.emailCheck = new FormControl('', [Validators.email]);
    this.phoneCheck = new FormControl('',[Validators.pattern('[6-9]\\d{9}')]);
    this.loginCheck = new FormControl('');
    this.isClicked = false;

  }

  ngOnInit() {
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
    if (!this.isClicked && !this.isFormEmpty() && !this.getEmailErrorMessage() &&!this.getPhoneErrorMessage() && this.password.length >= 6) {
      this.isClicked = true;
      this.theUser = new User();

      this.theUser.firstName = this.fName;
      this.theUser.lastName = this.lName;
      this.theUser.login = this.login;
      this.theUser.password = this.password;
      this.theUser.email = this.email;
      this.theUser.phone = this.phone;
      this.theUser.banExpired = null;
      this.theUser.banReason = null;

      this.signUp(this.theUser);
    } else {
      this.openSnackBar("Please, fill entire form", "OK");
    }
  }

  signUp(sUser: User) {

    this.httpService.post('/registration', sUser).subscribe(
        () => {
          console.log("You have been signed up successfully");
          this.isClicked = false;
          this.openSnackBar("You have been signed up successfully", "OK");
          this.router.goTo("/sign-in");
        },
        response => {
          this.loginCheck.setErrors({'': true});
          this.isClicked = false;
        }
    );

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
