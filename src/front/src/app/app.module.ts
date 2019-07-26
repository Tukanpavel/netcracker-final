import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material-module/material.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports:[
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
