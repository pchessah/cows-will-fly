import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import {cloneDeep  as __CloneDeep} from 'lodash';

import {ICart } from '@cows-will-fly/interfaces/cart';
import { IProduct } from '@cows-will-fly/interfaces/product';

@Injectable({providedIn: 'root'})
export class CartService {

  private _cartSrc$$ = new BehaviorSubject<ICart[]>([]);

  private _cart$ =  this._cartSrc$$.asObservable();
  
  constructor() { }

  getCart(){
    return this._cart$.pipe(filter(res => !!res));
  }

  addItemToCart(item: IProduct){
    const currentCart = this._cartSrc$$.value;
    const itemExists = currentCart.find(c => c.product.id === item.id);
    if(itemExists){
      const updatedItem = __CloneDeep(itemExists);
      updatedItem.count++;
      let updatedCart = currentCart.filter(c=> c.product.id !== item.id);
      updatedCart = [...updatedCart, updatedItem]
       this._cartSrc$$.next(updatedCart);
    }  else {
      const cartItem = {product: item, count: 1}
      const updatedCart = [...currentCart, cartItem]
      this._cartSrc$$.next(updatedCart);
   }
  }

  removeItemFromCart(item: IProduct){
    const currentCart = this._cartSrc$$.value;
    const itemToRemoveFromCart = currentCart.find(c => c.product.id === item.id);
    if(itemToRemoveFromCart){
      const countOfItem = itemToRemoveFromCart.count;
      if(countOfItem > 1){
        itemToRemoveFromCart.count--;
        let updatedCart = currentCart.filter(c=> c.product.id !== item.id);
        updatedCart = [...updatedCart, itemToRemoveFromCart]
        this._cartSrc$$.next(updatedCart);
      } else {
        const updatedCart = currentCart.filter(c => c.product.id !== item.id);
        this._cartSrc$$.next(updatedCart);
      }
    } 
  }

  getCartNumber(){
    return this._cart$.pipe(map(cart => cart.length))
  }
  
}