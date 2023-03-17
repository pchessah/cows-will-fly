import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementsExternalModule }           from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule }           from '@cows-will-fly/elements/common-ui';
import { SignUpComponent }                  from './components/signup/signup.component';
import { LogInComponent }                   from './components/login/login.component';
import { ForgotPasswordComponent }          from './components/forgot-password/forgot-password.component';
import { AuthRoutingModule }                from './auth.routing.module';
import { VerifyEmailComponent }             from './components/verify-email/verify-email.component';

@NgModule({
  imports: [CommonModule, ElementsExternalModule, AuthRoutingModule,
            ReactiveFormsModule, FormsModule, ElementsCommonUiModule],

  declarations:[SignUpComponent, LogInComponent, ForgotPasswordComponent,
                VerifyEmailComponent],
                
  exports:[], 
})
export class FeaturesAuthModule {}
