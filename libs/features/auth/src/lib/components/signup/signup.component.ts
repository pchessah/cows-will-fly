import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { SubSink }                            from "subsink";
import { AuthService }                        from '@cows-will-fly/state/auth';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls:['signup.component.scss']
})

export class SignUpComponent implements OnInit, OnDestroy{
  
  private _sbS = new SubSink();
  signupForm: FormGroup;
  isPasswordTheSame:boolean = true;
  isLoading: boolean = false;
  user: any;
  isLoggedIn: boolean = false;
  
  constructor(private _fb:FormBuilder,
              private _authService: AuthService,
              private _router:Router) {
    this._getLoggedInUser();

    this.signupForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$')]],
      password: ['' , [ Validators.required, Validators.minLength(8)]],
      password2: ['' , [ Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit() { 
    this._sbS.sink = 
        this.signupForm.valueChanges.subscribe(val =>{
          const password1 = val.password;
          const password2 = val.password2;
          this.isPasswordTheSame = password1 === password2
        });
  }

  submit() {
    if (this.signupForm.valid && this.isPasswordTheSame) {
      this.isLoading = true;
      const signUpFormValue = this.signupForm.value;
      const email = signUpFormValue.email;
      const password = signUpFormValue.password;
      this._sbS.sink =
          this._authService.signUp(email, password).subscribe(res =>{
            this.isLoading = false;
          });
    }
  }

  goToLogin(){
    this._router.navigateByUrl('/auth/login');
  }

  goToForgotPassword(){
    this._router.navigateByUrl('/auth/forgot-password');
  }

  check(val:string){
    return this.signupForm.get(val)?.invalid;
  }

  private _getLoggedInUser(){
    this.isLoading = true;
    this._sbS.sink = 
        this._authService.getLoggedInUser().subscribe(u => {
          if (u){
            this.isLoggedIn = true;
          }
          this.isLoading = false;
        })
  }

  logOut(){
    const a = window.confirm('Are you sure you want to log out?')
    if(a){
      this._sbS.sink = 
          this._authService.signOut().subscribe()
    }
  }

  ngOnDestroy(): void {
    this._sbS.unsubscribe();
  }

}