import { Component, OnInit } from '@angular/core';
import {User} from "./user/user";
import {AppRoutingModule} from "../app-routing.module";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  public theUser: User;

  constructor(private router: AppRoutingModule,
              private httpService: HttpService) {
  }

  ngOnInit() {
  }

  signUp(event: User) {
    this.theUser = event;

    this.httpService.post('/registration', event).subscribe(() => {
      alert("You have been signed up successfully");
      this.router.goTo("/sign-in");
    });
  }

}
