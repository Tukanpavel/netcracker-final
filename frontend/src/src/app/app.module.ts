import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material-module/material.module";
import {HttpClientModule} from "@angular/common/http";

import {MatStepperModule, MatInputModule, MatButtonModule, MatCardModule} from '@angular/material'
import {FormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './sign-up/user/user.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    SignUpComponent,
    UserComponent,
    PlaceholderComponent
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule, MatInputModule, MatButtonModule,
    MatCardModule,
    FormsModule
  ],
  exports:[
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
