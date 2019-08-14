import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";


export class Login{
  constructor(
    public status:string,
  ) {}

}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) {
  }

  redirectUrl: string = '';

  getRedirectUrl():string{
    return this.redirectUrl !== '' ? this.redirectUrl : '';
    this.redirectUrl='';
    console.log(this.redirectUrl);
  }

  authenticate(username, password) {
    let headers=new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpClient.get<Login>('http://localhost:8080/login',{headers} ).pipe(
      map(
        userData => {
          sessionStorage.setItem('token', btoa(username + ':' + password));
          sessionStorage.setItem('username', username);
          return userData;
        }
      )
    );
  }

  isLoggedIn(): boolean {
    let user = sessionStorage.getItem('username');
    return !(user === null)
  }

  logOut(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}

