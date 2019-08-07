import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginModel} from "./login.model";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private loginService: LoginService){ }

  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  user=new LoginModel();
  isClicked: boolean=false;

  submit() {
    if (this.form.valid && !this.isClicked) {
      this.isClicked=true;
      this.user=this.form.value;
      this.loginService.postLogin(this.user).subscribe(x=>console.log('Observer got a next value: ' + x),err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification'))
      console.log(this.user);
    }
  }

  getUsernameErrorMessage(){
    return 'Write username!';
  }

  getPasswordErrorMessage() {
    if (this.form.get('password').value==='') return "Password is required to sign in.";
    else return 'Password must be six characters or longer.'
  }
}
