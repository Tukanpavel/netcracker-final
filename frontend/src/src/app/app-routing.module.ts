import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";


const routes: Routes = [
  {
    path: 'sign-in', component:LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
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
