import { Injectable } from '@angular/core';
import {HttpService} from "../services/http.service";
import {LoginInfoModel} from "./login-info.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService:HttpService) { }
  postLogin(login:LoginInfoModel){
    return this.httpService.post('/login',login);
  }
}
