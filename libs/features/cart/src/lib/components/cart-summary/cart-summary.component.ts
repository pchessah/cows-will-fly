import { Component, Input, OnInit } from '@angular/core';
import { SubSink }                  from 'subsink';
import { combineLatest }            from 'rxjs';
import { DeviceDetectorService }    from 'ngx-device-detector';
import { ICart }                    from '@cows-will-fly/interfaces/cart';
import { CartService }              from '@cows-will-fly/state/cart';
import { IProduct }                 from '@cows-will-fly/interfaces/product';

@Component({
  selector: 'app-cart-summary',
  templateUrl: 'cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})

export class CartSummaryComponent implements OnInit{
  private _sbS = new SubSink();

  @Input()isSingleProductPage: boolean = false;
  @Input() isCheckOutPage: boolean = false;

  displayedColumns: string[] =  [ 'thumbnail', 'name', 'quantity', 'amount', 'remove'];
  displayedDeliveryCostColumns: string[] =  [ 't', 'n', 'q', 'a', 'r'];
  dataSource: ICart[] = [];
  cartTotal:number = 0;
  isMobile: boolean;
  deliveryCost: number = 0;

  constructor(private _cartService: CartService,
              private _deviceDetectorService: DeviceDetectorService) { 
    this.isMobile  = this._deviceDetectorService.isMobile();
    this._setDisplayColumns()
  }

  ngOnInit() {
    const cart$ = this._cartService.getCart();
    const deliveryCost$ = this._cartService.getDeliveryCost();
    this._sbS.sink = 
        
        combineLatest([cart$, deliveryCost$]).subscribe(([cart, deliveryCost]) => {
          this.dataSource = cart;
          this.deliveryCost = deliveryCost;
          this.cartTotal = cart.map(c =>{
            const price = c.product.price;
            const count = c.count;
            return price * count
          }).reduce((a,b) => a+b,0);
          this.cartTotal = this.cartTotal + deliveryCost ?? 0;
        });
  }

  private _setDisplayColumns(){
    this.displayedColumns = this.isMobile ? [ 'thumbnail', 'name', 'quantity', 'amount'] 
                                          : [ 'thumbnail', 'name', 'quantity', 'amount', 'remove'];

    this.displayedDeliveryCostColumns =  this.isMobile ? [ 't', 'n', 'q', 'a'] 
                                                       : [ 't', 'n', 'q', 'a', 'r'];
  }

  clearItemFromCart(item:IProduct){
    this._cartService.clearItemFromCart(item);
  }


  onChangeValue(event:any, cart:ICart){
    let productCount = event.target.value;

    if(Number(productCount) < 0) {
      productCount = 0;
    }

    let updatedCart = this.dataSource.filter(c => c.product.id !== cart.product.id);
    const cartItem:ICart = {product: cart.product, count: Number(productCount)};
    updatedCart = [...updatedCart, cartItem];
    this._cartService.updateCart(updatedCart);
  }

  ngOnDestroy(){
    this._sbS.unsubscribe();
  }

}
