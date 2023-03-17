import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { MatSnackBar }       from '@angular/material/snack-bar';
import { SubSink }           from 'subsink';
import { AuthService }       from '@cows-will-fly/state/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: 'verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})

export class VerifyEmailComponent implements OnInit
{
  private _sbS = new SubSink();
  
  isLoading:boolean = false;
  user:any = null as any;

  constructor(private _authService:AuthService,
              private _snackBar:MatSnackBar,
              private _router:Router)
  { }

  ngOnInit() {
    this._getLoggedInUser();
  }

  submit(){
    this.isLoading = true
    this._authService.sendVerificationMail().then((val) => {
      this._snackBar.open("📩 Verification Email Sent", "", {
        verticalPosition: 'top'
      });
      this.isLoading = false;
    }).catch(error => {
      this._snackBar.open("⛔️ There was an error" + error, "", {
        verticalPosition: 'top'
      });
      console.error(error);
      this.isLoading = false;
    });
  }

  goToLogin(){
    this._router.navigateByUrl('/auth/login');
  }

  goHome(){
    this._router.navigateByUrl('/');
  }

  goToSignUp(){
    this._router.navigateByUrl('/auth/signup');
  }

  private _getLoggedInUser(){
    this.isLoading = true;
    this._sbS.sink = 
        this._authService.getLoggedInUser().subscribe(u => {
          if (u){
            this.user = u as any;
          }
          if(u?.emailVerified){
            this.goHome();
          }
          this.isLoading = false;
        })
  }

}