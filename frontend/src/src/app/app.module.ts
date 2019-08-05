import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MaterialModule} from "../material-module/material.module";
import {HttpClientModule} from "@angular/common/http";
import {MatStepperModule, MatInputModule, MatButtonModule, MatCardModule, MatSnackBarModule} from '@angular/material'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    SignUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    MatStepperModule, MatInputModule, MatButtonModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule
  ],
  exports:[
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
