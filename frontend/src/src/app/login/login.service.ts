import { Injectable } from '@angular/core';
import {HttpService} from "../services/http.service";
import {LoginModel} from "./login.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpService:HttpService) { }

  redirectUrl:string;

  authenticate(username, password) {
    sessionStorage.setItem('username', username)
  }

  isLoggedIn():boolean {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut(): void {
    sessionStorage.removeItem('username')
  }

  postLogin(login:LoginModel) {
    let request:string='http://localhost:8080/login?username=test&password=qweqwe';
    console.log(request);
    return this.httpService.post(request);
  }
}
