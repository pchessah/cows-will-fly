import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { SubSink }                            from 'subsink';
import { AuthService }                        from '@cows-will-fly/state/auth';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LogInComponent implements OnInit {

  loginForm:FormGroup;

  private _sbs = new SubSink();
  isLoading: boolean = false;

  constructor(private _fb:FormBuilder, private _router:Router, private _authService:AuthService) {
    this.loginForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      password: ['' , [ Validators.required]]
    })
  }

  ngOnInit() { }

  submit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this._sbs.sink = 
          this._authService.signIn(email, password).subscribe(res =>{
            this.isLoading = false

          })
    }
  }

  goToSignUp(){
    this._router.navigateByUrl('/auth/signup');
  }

  goToForgotPassword(){
    this._router.navigateByUrl('/auth/forgot-password');
  }

}