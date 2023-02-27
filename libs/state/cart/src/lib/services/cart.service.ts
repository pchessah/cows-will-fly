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
    let updatedCart:ICart[] = [];
    const itemExists = currentCart.find(c => c.product.id === item.id);
    if(itemExists){
      const updatedItem = __CloneDeep(itemExists);
      updatedItem.count++;
      updatedCart = currentCart.filter(c=> c.product.id !== item.id);
      updatedCart = [...updatedCart, updatedItem]
    }  else {
      const cartItem = {product: item, count: 1}
      updatedCart = [...currentCart, cartItem]
   }
   this.updateCart(updatedCart);
  }

  removeItemFromCart(item: IProduct){
    const currentCart = this._cartSrc$$.value;
    let updatedCart:ICart[] = [];
    const itemToRemoveFromCart = currentCart.find(c => c.product.id === item.id);
    if(itemToRemoveFromCart){
      const countOfItem = itemToRemoveFromCart.count;
      if(countOfItem > 1){
        itemToRemoveFromCart.count--;
        updatedCart = currentCart.filter(c=> c.product.id !== item.id);
        updatedCart = [...updatedCart, itemToRemoveFromCart];
      } else {
        updatedCart = currentCart.filter(c => c.product.id !== item.id);
      }
      this.updateCart(updatedCart);
    } 
  }

  getCartNumber(){
    return this._cart$.pipe(map(cart => cart.length))
  }

  updateCart(updatedCart:ICart[]){
    this._cartSrc$$.next(updatedCart);
  }
  
}