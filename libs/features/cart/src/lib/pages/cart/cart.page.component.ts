import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router }                       from '@angular/router';
import { map }                          from 'rxjs';
import { SubSink }                      from 'subsink';
import { CartService }                  from '@cows-will-fly/state/cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: 'cart.page.component.html',
  styleUrls:['cart.page.component.scss']
})

export class CartPageComponent implements OnInit, OnDestroy {

  private _sbS = new SubSink();
  noItemsInCart: boolean = false;

  constructor(private _router:Router,
              private _cartService:CartService) { }

  ngOnInit() { 
    this._sbS.sink = 
      this._cartService.getCart().pipe(map(n =>  n.length === 0 )).subscribe(bool => {
        this.noItemsInCart = bool;
      });
  }

  goToProducts(){
    this._router.navigateByUrl('/products');
  }

  clearCart(){
    this._cartService.clearCart();
  }

  goToCheckout(){
    this._router.navigateByUrl('/checkout');
  }

  ngOnDestroy(){
    this._sbS.unsubscribe();
  }
}