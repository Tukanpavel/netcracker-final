import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatCardModule} from '@angular/material'
import {HttpClientModule} from "@angular/common/http";
import { UserComponent } from './sign-up/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule, MatInputModule, MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
