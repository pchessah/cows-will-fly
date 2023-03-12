import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable, map }   from 'rxjs';

import { CartService }       from '@cows-will-fly/state/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})

export class NavbarComponent implements OnInit {

  cartCount$!: Observable<number>;

  constructor(private _router:Router,
              private _cartService:CartService) { }

  ngOnInit() {
    this.cartCount$ = 
      this._cartService.getCart().pipe(map(res =>{
        return res.map(r => r.count).reduce((a,b) => a+b, 0);
      }))

  }

  goToCartPage(){
    this._router.navigateByUrl('/cart');
  }

  goToHomePage(){
    this._router.navigateByUrl('/');
  }
}