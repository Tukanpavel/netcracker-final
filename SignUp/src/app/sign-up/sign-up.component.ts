import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

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

  signup(event: User) {
    const url = environment.url + "/signup";
    this.httpService.put(url, event).subscribe(() => {
      alert("Put successful");
      this.theUser = new User();
    });
  }
}
