import { Injectable }       from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, filter, map }              from 'rxjs';
import { IPromoCode }       from '@cows-will-fly/interfaces/user';

@Injectable({providedIn: 'root'})

export class PromoCodeService {

  private _promoCodeSrc$$ =  new BehaviorSubject<IPromoCode>(null as any);
  private _promoCode$ = this._promoCodeSrc$$.asObservable();

  constructor(private _afs:AngularFirestore) { }

  getCurrentPromoCode(){
    return this._promoCode$;
  }

  setPromoCode(promoCode:IPromoCode){
    this._promoCodeSrc$$.next(promoCode);
  }

  getCurrentPromoCodeValue(){
    return this._promoCodeSrc$$.getValue();
  }

  private _getPromoCode(name:string){
    return this._afs.collection('promocodes').doc(name).valueChanges();
  }

  getPromoCodeFromDb(name:string){
    return this._getPromoCode(name).pipe(filter(promocode => !!promocode),map(promocode => {
      return (promocode as IPromoCode);
    }));
  }

  clearCurrentPromoCode(){
    this._promoCodeSrc$$.next(null as any);
  }
  
}