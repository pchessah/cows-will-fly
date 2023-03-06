import { Injectable }       from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from }             from 'rxjs';

import {IUserDetails }      from "@cows-will-fly/interfaces/user";
import {ICart, IOrder}      from '@cows-will-fly/interfaces/cart';


@Injectable({providedIn: 'root'})


export class CheckoutStateService {

  constructor(private _afs:AngularFirestore) { }

  createOrder(cart:ICart[], userDetails:IUserDetails){
    const id = this._afs.createId();
    const order: IOrder = {
      cart: cart,
      user:userDetails,
      id: id
    }
    return from(this._afs.doc(`orders/${id}`).set(order));
  }
  
}