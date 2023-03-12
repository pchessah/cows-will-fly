import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { AuthService } from '@cows-will-fly/state/auth';
import { SubSink }                            from 'subsink';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls:['forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  
  private _sBs = new SubSink();

  forgotPasswordForm:FormGroup;
  isLoading: boolean = false;

  constructor(private _fb:FormBuilder,
              private _authService: AuthService,
              private _router:Router) {
    this.forgotPasswordForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required]]
    })
  }

  ngOnInit() { }

  submit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      const email = this.forgotPasswordForm.value.email;
      this._sBs.sink = 
          this._authService.forgotPassword(email).subscribe((res)=>{
            this.goToLogin();
            this.isLoading = false;
          })
    }
  }

  goToLogin(){
    this._router.navigateByUrl('/auth/login');
  }

  goToSignUp(){
    this._router.navigateByUrl('/auth/signup');
  }



}