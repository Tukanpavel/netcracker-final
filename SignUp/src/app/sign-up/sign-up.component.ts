import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  public theUser: User;

  constructor(private httpService: HttpClient) {
  }

  ngOnInit() {
    this.theUser = new User();
  }

  signUp(event: User) {
    console.log('signup() - SUCCESS');
    const url = environment.url + "/registration";
    this.httpService.put(url, event).subscribe(() => {
      alert("Put successful");
      this.theUser = new User();
    });
    console.log('signup() - SUCCESS');
  }
}
