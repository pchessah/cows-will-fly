import { Injectable }                                from "@angular/core";
import { AngularFireAuth }                           from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import { Router }                                    from "@angular/router";
import { MatSnackBar }                               from '@angular/material/snack-bar';
import { defer, from }                               from "rxjs";
import { IUser }                                     from "@cows-will-fly/interfaces/user";
import { LocalStorageService }                       from '@cows-will-fly/state/local-storage';

@Injectable({ providedIn: "root" })

export class AuthService {
  userData: any; // Save logged in user data

  constructor(private afs: AngularFirestore,
              private _snackBar: MatSnackBar,
              private afAuth: AngularFireAuth, 
              private router: Router,
              private _localStorageService: LocalStorageService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this._localStorageService.saveData("user",JSON.stringify(this.userData));
        this._localStorageService.getData("user");
      } else {
        this._localStorageService.saveData("user","null");
        this._localStorageService.getData("user");
      }
    });
  }

  getLoggedInUser(){
    return this.afAuth.authState
  }

  openSnackBar(message:string){
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top'
    })
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    const signIn$ = 
        this.afAuth.signInWithEmailAndPassword(email, password)
                   .then((result) => {
                      this.setUserData(result.user);
                      this.openSnackBar('🎉 Logged in Successfully!');
                      this.afAuth.authState.
                      subscribe((user) => {
                        if (user) {
                          this.router.navigateByUrl('/home');
                        }
                      });
                    })
                   .catch((error) => {
                    this.openSnackBar('😢 Log in failed because of '+ error.message)
                  });

    return defer(() => from(signIn$));
  }
  // Sign up with email/password
  signUp(email: string, password: string) {
    const signUp$ = this.afAuth.createUserWithEmailAndPassword(email, password)
                        .then((result) => {
                          this.sendVerificationMail();
                          this.setUserData(result.user)
                          this.openSnackBar('🎉 Signed up Successfully!');
                        })
                        .catch((error) => {
                          this.openSnackBar('😢 Sign up failed because of '+ error.message)
                          console.error(error.message);
                        });            
    return defer(() => from(signUp$));
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    const forgotPassword$ = this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => this.openSnackBar('🔐 Password reset email sent, check your inbox.'))
      .catch((error) => this.openSnackBar('😢 Password reset failed because of.' + error.message));
  
    return defer(() => from(forgotPassword$));
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
      return this.afAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          this.openSnackBar( "📩 Verification Email Sent");
          this.router.navigate(['auth/verify-email-address']);
        }).catch(error =>{
          this.openSnackBar('😢 Verificationfailed because of.' + error.message);
        });
  }
  
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(this._localStorageService.getData("user")!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get loggedInUser(){
    const user = JSON.parse(this._localStorageService.getData("user")!);
    return user;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: this.getNameFromEmail(user.email),
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  signOut() {
    const signOut$ = this.afAuth.signOut().then(() => {
      this._localStorageService.removeData("user");
      this.router.navigateByUrl('/auth/login');
    });

    return defer(() => from(signOut$));
  }

  getNameFromEmail(emailAddress:string){
    return emailAddress.substring(0, emailAddress.indexOf("@"));
  }
}
