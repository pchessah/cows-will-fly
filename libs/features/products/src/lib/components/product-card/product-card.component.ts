import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { SubSink } from 'subsink';

import { ICart } from '@cows-will-fly/interfaces/cart';
import { IProduct } from '@cows-will-fly/interfaces/product';
import {CartService} from '@cows-will-fly/state/cart';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product!:IProduct;
  private _sbS = new SubSink();
  productCountInCart: number = 0;
  private _cart: ICart[] = [];

  constructor(private _router:Router, private _cartService:CartService) { }

  ngOnInit() {
    this._sbS.sink = 
        this._cartService.getCart().subscribe(cart => {
          this._cart = cart;
          this.productCountInCart = 
              cart.find(item => item.product.id === this.product.id)?.count as number ?? 0;
        });
   }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['product']){
      this.product = changes['product'].currentValue;
    }
  }

  goToProduct(){
    this._router.navigateByUrl(`/products/${this.product.id}`)
  }

  addItemToCart(product:IProduct){
    return this._cartService.addItemToCart(product);
  }

  removeItemFromCart(product: IProduct){
    return this._cartService.removeItemFromCart(product);
  }

  onChangeValue(event:any){
    const productCount = event.target.value;
    let updatedCart  = this._cart.filter(c => c.product.id !== this.product.id);
    const cartItem:ICart = {product: this.product, count: productCount };
    updatedCart = [...updatedCart, cartItem];
    this._cartService.updateCart(updatedCart);
  }

  ngOnDestroy(): void {
      this._sbS.unsubscribe();
  }
}