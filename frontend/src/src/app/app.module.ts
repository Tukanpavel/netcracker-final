import { NgModule } from '@angular/core';

import {SharedModule} from "./shared/shared.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    SignUpComponent,
    PlaceholderComponent
  ],
  imports: [SharedModule],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
