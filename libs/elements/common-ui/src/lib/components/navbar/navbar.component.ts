import { Component, HostListener, OnDestroy,
         OnInit }          from '@angular/core';
import { Router }          from '@angular/router';
import { Observable, map } from 'rxjs';
import { SubSink }         from 'subsink';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CartService }     from '@cows-will-fly/state/cart';
import { AuthService }     from '@cows-will-fly/state/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {

  private _sbS = new SubSink();
  cartCount$!: Observable<number>;
  isMobile:boolean = false;
  width: number = 600;
  isLoggedIn:boolean = false;
  name: string = null as any;
  emailVerified: boolean = false;

  constructor(private _router:Router,
              private _deviceDetectorService: DeviceDetectorService,
              private _authService: AuthService,
              private _cartService:CartService) {
  
    this.isLoggedIn = this._authService.isLoggedIn;
    this.isMobile = this._deviceDetectorService.isMobile();
 }

  ngOnInit() {
    this.cartCount$ = 
      this._cartService.getCart().pipe(map(res =>{
        return res.map(r => r.count).reduce((a,b) => a+b, 0);
      }));
    this.getLoggedInUser();
  }

  goToCartPage(){
    this._router.navigateByUrl('/cart');
  }

  goToHomePage(){
    this._router.navigateByUrl('/');
  }

  goToLogin(){
    this._router.navigateByUrl('/auth/login');
  }

  goToVerifyEmailAddress(){
    this._router.navigateByUrl('/auth/verify-email-address');
  }

  getLoggedInUser(){
    this._sbS.sink = 
        this._authService.getLoggedInUser().subscribe(u => {
          if(u?.email){
            this.name = this._authService.getNameFromEmail(u.email);
            this.emailVerified = u.emailVerified;
          }
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