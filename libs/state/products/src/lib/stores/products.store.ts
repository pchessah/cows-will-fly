import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

import { IProduct} from '@cows-will-fly/interfaces/product';

@Injectable({providedIn: 'root'})

//TODO: Add way to catch Errors
export class ProductStore {

  private _productsSrc$$ = new BehaviorSubject<IProduct[]>(null as any);
  private _products$ = this._productsSrc$$.asObservable();

  constructor(private _afs:AngularFirestore) {
    this._initializedDataFromFirestore();
   }


  private _initializedDataFromFirestore(){
    return this._afs.collection('products').valueChanges().subscribe(data =>{
      this._productsSrc$$.next(data as any);
    })
  }

  getProducts(){
    return this._products$;
  }


  
}