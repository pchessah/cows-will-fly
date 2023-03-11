import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementsExternalModule }           from '@cows-will-fly/elements/external';
import { SignUpComponent }                  from './components/signup/signup.component';
import { LogInComponent }                   from './components/login/login.component';
import { ForgotPasswordComponent }          from './components/forgot-password/forgot-password.component';
import { AuthRoutingModule }                from './auth.routing.module';

@NgModule({
  imports: [CommonModule, ElementsExternalModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
  declarations:[SignUpComponent, LogInComponent, ForgotPasswordComponent],
  exports:[SignUpComponent, LogInComponent, ForgotPasswordComponent]
})
export class FeaturesAuthModule {}
