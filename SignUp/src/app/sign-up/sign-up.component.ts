import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher, MatCardModule, MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material';


/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private fb: FormBuilder) {
  this.initForm();
  }

  fN:string;
  lN:string;
  login:string;
  password:string;
  verifyPassword:string;
  email:string;
  phone:string;

  initForm() {
    this.userForm = this.fb.group({
      fN: '',
      lN: '',
      login: '',
      password: '',
      verifyPassword: '',
      email: '',
      phone: ''
    }, {
      validator: this.passwordValidator
    })
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }

  getValues() {
    this.fN = this.userForm.get('fN').value;
    this.lN = this.userForm.get('lN').value;
    this.login = this.userForm.get('login').value;
    this.password = this.userForm.get('password').value;
    this.verifyPassword = this.userForm.get('verifyPassword').value;
    this.email = this.userForm.get('email').value;
    this.phone = this.userForm.get('phone').value;
  }

  ngOnInit() {
  }

}
