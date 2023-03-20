import { Injectable }                   from '@angular/core';
import { MatSnackBar }                  from '@angular/material/snack-bar';
import { BehaviorSubject, filter, map } from 'rxjs';
import { cloneDeep  as __CloneDeep }    from 'lodash';
import { ICart }                        from '@cows-will-fly/interfaces/cart';
import { IProduct }                     from '@cows-will-fly/interfaces/product';
import { LocalStorageService }          from '@cows-will-fly/state/local-storage';

@Injectable({providedIn: 'root'})

export class CartService {

  private _cartSrc$$ = new BehaviorSubject<ICart[]>([]);
  private _cart$ =  this._cartSrc$$.asObservable();
  
  constructor(private _localSorageService: LocalStorageService,
              private _snackBar: MatSnackBar) { 
    this._initializeData();
  }

  getCart(){
    return this._cart$.pipe(filter(res => !!res));
  }

  private _initializeData(){
    const data:ICart[] = JSON.parse(this._localSorageService.getData('cart') as string);
    if(data){
      this.updateCart(data);
    }
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
   this.openSnackBar(`✅ ${item.name} added to cart.`)
  }

  openSnackBar(message:string){
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top'
    })
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
      this.openSnackBar(`❌ 1 ${item.name} removed from cart.`)
    } 
  }

  getCartNumber(){
    return this._cart$.pipe(map(cart => cart.length), filter(res => !!res))
  }

  getCartTotal(){
    return this._cart$.pipe(map(cart =>{
      return cart.map(c => {
        const count = c.count;
        const price = c.product.price;
        return count*price;
      }).reduce((a,b) => a+b, 0)
    }),  filter(res => !!res))
  }

  updateCart(updatedCart:ICart[]){
    this._localSorageService.removeData("cart");
    this._localSorageService.saveData("cart", JSON.stringify(updatedCart));
    this._cartSrc$$.next(updatedCart);
  }

  clearItemFromCart(item:IProduct){
    const currentCart = this._cartSrc$$.value;
    const updatedCart:ICart[] = currentCart.filter(c=> c.product.id !== item.id);
    this.updateCart(updatedCart);
    this.openSnackBar(`❌ ${item.name} removed from cart.`)

  }

  clearCart(isCheckout?:boolean){
    this.updateCart([]);
    this.openSnackBar( isCheckout ? '🎉 Order succesfully placed.' : `🔥 Cart has been cleared.`)
  }
  
}