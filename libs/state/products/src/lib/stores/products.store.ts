import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({providedIn: 'root'})

//TODO: Add way to catch Errors
export class ProductStore {

  constructor(private _afs:AngularFirestore) { }


  getProducts(){
    return  this._afs.collection('products').valueChanges();
  }

  getOneProduct(id:string){
   return this._afs.collection('products').doc(id).valueChanges();
  }


  
}