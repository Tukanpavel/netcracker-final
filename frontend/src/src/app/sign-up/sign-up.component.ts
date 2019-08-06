import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  formGroup: FormGroup;

  isClicked: boolean;
  isUsed: boolean;

  private theUser: User;

  constructor(private httpService: HttpService, private router: AppRoutingModule, private _snackBar: MatSnackBar) {

  this.isClicked = false;
  this.isUsed = false;

    this.formGroup = new FormGroup( {
        fNameF: new FormControl(''),
        lNameF: new FormControl(''),
        loginF: new FormControl(''),
        passwordF: new FormControl(''),
        emailF: new FormControl('', [Validators.email]),
        phoneF: new FormControl('',[Validators.pattern('[6-9]\\d{9}')]),
      }

    );
  }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.formGroup.get('emailF').hasError('email') ? 'Not a valid email' :
      '';
  }

  getPhoneErrorMessage() {
    return this.formGroup.get('phoneF').hasError('pattern') ? 'Not a valid phone number' :
      '';
  }

  getLoginErrorMessage() {
      return this.formGroup.get('loginF').hasError('pattern') ? 'This username has been already used' :
        '';
  }

  getValues() {
    if (!this.isClicked && this.formGroup.valid) {
      this.isClicked = true;
      this.theUser = new User();

      this.theUser.firstName = this.formGroup.get('fNameF').value;
      this.theUser.lastName = this.formGroup.get('lNameF').value;
      this.theUser.login = this.formGroup.get('loginF').value;
      this.theUser.password = this.formGroup.get('passwordF').value;
      this.theUser.email = this.formGroup.get('emailF').value;
      this.theUser.phone = this.formGroup.get('phoneF').value;
      this.theUser.banExpired = null;
      this.theUser.banReason = null;

      this.signUp(this.theUser);
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
          console.log(response);
          if (response === "User already exists") {
            this.formGroup.get('loginF').setErrors({'pattern': true});
          } else {
            this.openSnackBar("It was unable to sign up. Please, try again later", "OK");
          }
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
