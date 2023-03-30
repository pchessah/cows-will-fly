import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubSink }                  from 'subsink';
import { combineLatest }            from 'rxjs';
import { DeviceDetectorService }    from 'ngx-device-detector';
import { ICart }                    from '@cows-will-fly/interfaces/cart';
import { IProduct }                 from '@cows-will-fly/interfaces/product';
import { IPromoCode }               from '@cows-will-fly/interfaces/user';
import { CartService }              from '@cows-will-fly/state/cart';
import { PromoCodeService }         from '@cows-will-fly/state/checkout';


@Component({
  selector: 'app-cart-summary',
  templateUrl: 'cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})

export class CartSummaryComponent implements OnInit{
  private _sbS = new SubSink();

  @Input()isSingleProductPage: boolean = false;
  @Input() isCheckOutPage: boolean = false;
  @Output() updateNoItemsInCart:EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] =  [ 'thumbnail', 'name', 'quantity', 'amount', 'remove'];
  displayedDeliveryCostColumns: string[] =  [ 't', 'n', 'q', 'a', 'r'];
  displayedPromoCodeColumns: string[] =  [ 'ta', 'na', 'qa', 'aa', 'ra'];
  dataSource: ICart[] = [];
  cartTotal:number = 0;
  isMobile: boolean;
  deliveryCost: number = 0;
  currentPromoCode:IPromoCode = null as any;

  constructor(private _cartService: CartService,
              private _promoCodeService: PromoCodeService,
              private _deviceDetectorService: DeviceDetectorService)
  { 
    this.isMobile  = this._deviceDetectorService.isMobile();
    this._setDisplayColumns()
  }

  ngOnInit() {
    const cart$ = this._cartService.getCart();
    const deliveryCost$ = this._cartService.getDeliveryCost();
    const promoCode$ = this._promoCodeService.getCurrentPromoCode();

    this._sbS.sink = 
        combineLatest([cart$, deliveryCost$, promoCode$]).subscribe(([cart, deliveryCost, currentPromoCode]) => {
          this.dataSource = cart.filter(c => c.count > 0);
          if(this.dataSource.length  === 0){
            this.updateNoItemsInCart.emit()
          }
          this.deliveryCost = deliveryCost;
          this.currentPromoCode = currentPromoCode;

          this.cartTotal = cart.map(c =>{
            const price = c.product.price;
            const count = c.count;
            return price * count
          }).reduce((a,b) => a+b,0);

          if(!!deliveryCost){
            this.cartTotal += deliveryCost;
          }

          if(!!currentPromoCode?.value){
            this.cartTotal -= currentPromoCode?.value;
          }
         
        });
  }

  private _setDisplayColumns(){
    this.displayedColumns = this.isMobile ? [ 'thumbnail', 'name', 'quantity', 'amount'] 
                                          : [ 'thumbnail', 'name', 'quantity', 'amount', 'remove'];

    this.displayedDeliveryCostColumns =  this.isMobile ? [ 't', 'n', 'q', 'a'] 
                                                       : [ 't', 'n', 'q', 'a', 'r'];

    this.displayedPromoCodeColumns =  this.isMobile ? [ 'ta', 'na', 'qa', 'aa'] 
                                                    : [ 'ta', 'na', 'qa', 'aa', 'ra'];

  }

  clearItemFromCart(item:IProduct){
    this._cartService.clearItemFromCart(item);
  }


  onChangeValue(event:any, cart:ICart){
    let productCount = event.target.value;

    if(Number(productCount) < 0) {
      productCount = 0;
    }

    if(productCount === 0){
      this._cartService.removeItemFromCart(cart.product);
    } else {
      let updatedCart = this.dataSource.filter(c => c.product.id !== cart.product.id);
      const cartItem:ICart = {product: cart.product, count: Number(productCount)};
      updatedCart = [...updatedCart, cartItem];
      this._cartService.updateCart(updatedCart);
    }
  }

  ngOnDestroy(){
    this._sbS.unsubscribe();
  }

}
