import { Component, OnInit } from '@angular/core';
import {User} from "./user/user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  public theUser: User;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  signUp(event: User) {
    this.theUser = event;
    return this.http.post<User>(environment.url+'/registration', event).pipe(catchError(this.handleError)).subscribe(() => {
      alert("You have been signed up successfully");
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Error: it was unable to sign up!\n', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      window.alert(`Error: it was unable to sign up!\n${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Error: it was unable to sign up!\nSomething bad happened; please try again later.');
  };

}
