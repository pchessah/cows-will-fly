import { Component, HostListener, OnDestroy,
         OnInit }          from '@angular/core';
import { Router }          from '@angular/router';
import { Observable, map } from 'rxjs';
import { SubSink }         from 'subsink';
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

  constructor(private _router:Router,
              private _authService: AuthService,
              private _cartService:CartService) {
  
    this.isLoggedIn = this._authService.isLoggedIn;
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

  getLoggedInUser(){
    this._sbS.sink = 
        this._authService.getLoggedInUser().subscribe(u => {
          if(u?.email){
            this.name = this._authService.getNameFromEmail(u.email)
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

	@HostListener('window:resize', ['$event'])
	onResize(event: { target: { innerWidth: number; }; }) {
		this.width = event.target.innerWidth;
    this.isMobile = this.width < 600;
	}

  ngOnDestroy(): void {
      this._sbS.unsubscribe();
  }
}