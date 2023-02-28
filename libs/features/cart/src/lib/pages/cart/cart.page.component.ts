import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@cows-will-fly/state/cart';
import { Observable, map } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cart-page',
  templateUrl: 'cart.page.component.html',
  styleUrls:['cart.page.component.scss']
})

export class CartPageComponent implements OnInit {

  private _sbS = new SubSink();
  noItemsInCart: boolean = false;

  constructor(private _router:Router,
              private _cartService:CartService) { }

  ngOnInit() { 
    this._sbS.sink = 
      this._cartService.getCartNumber().pipe(map(n =>  n === 0 )).subscribe(bool =>{
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
}