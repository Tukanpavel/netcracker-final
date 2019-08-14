import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  appTitle:string='NCvito';
  username():string{ return sessionStorage.getItem('username');}
  constructor(public loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.logOut();
    this.router.navigate(['']);
  }

}
