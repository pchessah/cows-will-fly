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
  isLoggedIn: boolean = false;

  constructor(private _fb:FormBuilder,
              private _router:Router,
              private _authService:AuthService) {
    this._getLoggedInUser();

    this.loginForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$')]],
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

  logOut(){
    const a = window.confirm('Are you sure you want to log out?')
    if(a){
      this._sbs.sink = 
          this._authService.signOut().subscribe()
    }
  }


  private _getLoggedInUser(){
    this.isLoading = true;
    this._sbs.sink = 
        this._authService.getLoggedInUser().subscribe(u => {
          if (u){
            this.isLoggedIn = true;
          }
          this.isLoading = false;
        })
  }

  ngOnDestroy(){
    this._sbs.unsubscribe();
  }
}