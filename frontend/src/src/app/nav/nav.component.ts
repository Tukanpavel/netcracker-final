import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  appTitle:string='NCvito';
  username():string{ return sessionStorage.getItem('username');}
  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

}
