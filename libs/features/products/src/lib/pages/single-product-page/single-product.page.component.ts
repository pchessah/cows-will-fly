import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Observable, combineLatest, map, switchMap }   from 'rxjs';
import { SubSink }                      from 'subsink';
import { IProduct }                     from '@cows-will-fly/interfaces/product';
import { ProductStore }                 from '@cows-will-fly/state/products';
import { CartService }                  from '@cows-will-fly/state/cart';
import { ICart }                        from '@cows-will-fly/interfaces/cart';

@Component({
  selector: 'app-single-product',
  templateUrl: 'single-product.page.component.html',
  styleUrls: ['./single-product.page.component.scss']
})

export class SingleProductPageComponent implements OnInit, OnDestroy {

  private _cart: ICart[] = [];
  private _sbS = new SubSink();

  product!: IProduct;
  isLoaded: boolean = false;
  singleProduct$!: Observable<IProduct>;
  cartCount$!: Observable<number>;
  productCountInCart: number = 0;

  constructor(private _activatedRoute: ActivatedRoute,
              private _cartService:CartService,
              private _productStore: ProductStore) { }

  ngOnInit() { 
    this._loadDataFromRoute();

    this.cartCount$ = 
        this._cartService.getCart().pipe(map(res => {
          return res.map(r => r.count).reduce((a,b) => a+b, 0);
        }));
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

  private _loadDataFromRoute(){
    
   const p$ = this._activatedRoute.params
                        .pipe(switchMap(params =>{
                                  const id = params['id'];
                                  return this._productStore.getOneProduct(id)}));

   const cart$ = this._cartService.getCart();

   this._sbS.sink = 
      combineLatest([cart$, p$]).subscribe(([cart, pr])=> {
        this.product = pr as any;
        this._cart = cart;
        this.productCountInCart = 
                  cart.find(item => item.product.id === this.product.id)?.count as number ?? 0;
   })

   this.singleProduct$ = p$ as Observable<IProduct>;
                    
  }
}