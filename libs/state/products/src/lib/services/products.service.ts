import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { IProduct} from '@cows-will-fly/interfaces/product';

@Injectable({providedIn: 'root'})
export class ProductService {

  private _productsSrc$$ = new BehaviorSubject<IProduct[]>(null as any);
  products$ = this._productsSrc$$.asObservable();

  constructor(private _afs:AngularFirestore) {
    this._getProducts();
   }


  private _getProducts(){
    return this._afs.collection('products').valueChanges().subscribe(data =>{
      this._productsSrc$$.next(data as any);
    })
  }


  
}