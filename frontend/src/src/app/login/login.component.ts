import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginInfo} from "../login-info";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  //loginService: LoginService= new LoginService();


  is_clicked: boolean=false;

  submit() {
    if (this.form.valid&&!this.is_clicked) {
      this.is_clicked=true;
      //this.user.username=this.form.get('username').value;
      //this.user.password=this.form.get('password').value;
      this.submitEM.emit(this.form.value);
      //this.loginService.postLogin(this.user).subscribe(x=>console.log('Observer got a next value: ' + x),err => console.error('Observer got an error: ' + err),
        //() => console.log('Observer got a complete notification'))
    }
  }

  @Output() submitEM = new EventEmitter();

  getUsernameErrorMessage(){
    return 'Write username!';
  }

  getPasswordErrorMessage() {
    if (this.form.get('password').value==='') return "Password is required to sign in.";
    else return 'Password must be six characters or longer.'
  }
}
