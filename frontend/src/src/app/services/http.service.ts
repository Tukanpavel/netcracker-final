import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
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

  post(url:string,object: Object): Observable<typeof object> {
    return this.http.post<typeof object>(environment.url+url, object)
      .pipe(
        catchError(this.handleError)
      );
  }
}
