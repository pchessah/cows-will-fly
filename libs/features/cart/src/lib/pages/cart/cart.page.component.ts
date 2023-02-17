import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: 'cart.page.component.html',
  styleUrls:['cart.page.component.scss']
})

export class CartPageComponent implements OnInit {

  noItemsInCart: boolean = false;

  constructor(private _router:Router) { }

  ngOnInit() { }

  goToProducts(){
    this._router.navigateByUrl('/products');
  }

  clearCart(){
    this.noItemsInCart = true;
  }

  goToCheckout(){
    this._router.navigateByUrl('/checkout');
  }
}