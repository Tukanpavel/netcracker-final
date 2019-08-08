import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginInfoModel} from "./login-info.model";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router){ }

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
          this.loginService.redirectUrl !== '' ? this.loginService.redirectUrl : ''
        ])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.isClicked = false;
      }
    )
  }


  getUsernameErrorMessage(){
    return 'Write username!';
  }

  getPasswordErrorMessage() {
    if (this.form.get('password').value==='') return "Password is required to sign in.";
    else return 'Password must be six characters or longer.'
  }
}
