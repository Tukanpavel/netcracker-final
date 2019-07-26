import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  is_clicked: boolean=false;

  submit() {
    if (this.form.valid&&!this.is_clicked) {
      this.is_clicked=true;
      this.submitEM.emit(this.form.value);
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
