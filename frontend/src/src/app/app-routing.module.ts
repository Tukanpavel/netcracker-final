import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {PlaceholderComponent} from "./placeholder/placeholder.component";
import {AuthGuardService} from "./services/auth.guard.service";


const routes: Routes = [
  {
    path: 'sign-in', component:LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path:'advertisements', component:PlaceholderComponent
  },
  {
    path:'profile', component:PlaceholderComponent, canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router){}

  goTo(url) {
    this.router.navigateByUrl(url);
  }
}
