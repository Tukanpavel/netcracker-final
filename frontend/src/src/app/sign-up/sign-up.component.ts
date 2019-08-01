import { Component, OnInit } from '@angular/core';
import {User} from "./user/user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {throwError} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  signUp(event: User) {
    return this.http.post<User>(environment.url+'/registration', event).subscribe(() => {
      alert("You have been signed up successfully");
    }, error1 => alert("Error: it was unable to sign up!"));

    console.log('signup() - SUCCESS');
  }

}
