import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginInfoModel} from "./login-info.model";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ){ }

  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  user=new LoginInfoModel;
  isClicked: boolean=false;
  invalidLogin: boolean;

  submit() {
    if (this.form.valid && !this.isClicked) {
      this.isClicked=true;
      this.user=this.form.value;
      this.checkLogin();
      console.log(this.user);
    }
  }

  checkLogin(): void{
    this.loginService.authenticate(this.user.username, this.user.password).subscribe(
      data => {
        this.router.navigate([
          this.loginService.getRedirectUrl()
        ])
        this.invalidLogin = false
      },
      error => {
        this.openSnackBar("It was unable to sign inc. Please, try again later", "OK");
        this.invalidLogin = true
        this.isClicked = false;
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }


  getUsernameErrorMessage(){
    return 'Write username!';
  }

  getPasswordErrorMessage() {
    if (this.form.get('password').value==='') return "Password is required to sign in.";
    else return 'Password must be six characters or longer.'
  }
}
