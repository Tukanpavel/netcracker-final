import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher, MatCardModule, MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material';
import {User} from "../user";


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
  user: User;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private fb: FormBuilder) {
    this.initForm();
    this.user = new User();
  }

  initForm() {
    this.userForm = this.fb.group({
      fName: null,
      lName: null,
      login: null,
      password: null,
      verifyPassword: null,
      email: null,
      phone: null
    }, {
      validator: this.passwordValidator
    })
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }

  isEmpty() {
    if (this.userForm.get('fName').value == null ||
        this.userForm.get('lName').value == null ||
        this.userForm.get('login').value == null ||
        this.userForm.get('password').value == null ||
        this.userForm.get('verifyPassword').value == null ||
        this.userForm.get('email').value == null ||
        this.userForm.get('phone').value == null) {
        return true;
    } else {
        return false;
    }
  }

  validPasswords() {
    if (this.userForm.get('password').value == this.userForm.get('verifyPassword').value) {
      return true;
    } else {
      return false;
    }
  }

  getValues() {
    if (!this.isEmpty() && this.validPasswords()) {
      this.user.fName = this.userForm.get('fName').value;
      this.user.lName = this.userForm.get('lName').value;
      this.user.login = this.userForm.get('login').value;
      this.user.password = this.userForm.get('password').value;
      this.user.email = this.userForm.get('email').value;
      this.user.phone = this.userForm.get('phone').value;

      console.log('getValues() - SUCCESS');
    }
  }

  ngOnInit() {
  }

}
