import { NgModule }                from '@angular/core';
import { Routes, RouterModule }    from '@angular/router'; 
import { LogInComponent }          from './components/login/login.component';
import { SignUpComponent }         from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent }    from './components/verify-email/verify-email.component';


const routes: Routes = [
  { path: 'login', component:LogInComponent },
  { path: 'signup', component:SignUpComponent},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'verify-email-address', component: VerifyEmailComponent},
  { path: "", redirectTo: "/auth/login", pathMatch: "full" }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }