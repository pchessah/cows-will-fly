import { Injectable }                      from '@angular/core';
import { AngularFirestore }                from '@angular/fire/compat/firestore';
import { combineLatest, from }             from 'rxjs';

import {IUserDetails }                     from "@cows-will-fly/interfaces/user";
import {ICart, IOrder}                     from '@cows-will-fly/interfaces/cart';
import { EmailCheckoutService }            from './email-checkout.service';

@Injectable({providedIn: 'root'})

export class CheckoutStateService {

  constructor(private _afs:AngularFirestore,
              private _emailCheckoutService:EmailCheckoutService) { }

  //TODO: ADD WAY TO CATCH ERRORS
  createOrder(cart:ICart[], userDetails:IUserDetails){
    const id = this._afs.createId();
    const order: IOrder = {
      cart: cart,
      user:userDetails,
      id: id
    }

    const sendMail$ = this._emailCheckoutService.sendEmail(order);
    const prom$ = from(this._afs.doc(`orders/${id}`).set(order));

    return combineLatest([prom$, sendMail$]);
  }
  
}