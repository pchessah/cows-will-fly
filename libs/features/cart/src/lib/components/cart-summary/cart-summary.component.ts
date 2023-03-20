import { Component, Input, OnInit } from '@angular/core';
import { SubSink }                  from 'subsink';
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
  dataSource: ICart[] = [];
  cartTotal:Number = 0;
  isMobile: boolean;

  constructor(private _cartService: CartService,
              private _deviceDetectorService: DeviceDetectorService) { 
    this.isMobile  = this._deviceDetectorService.isMobile();
    this.displayedColumns = this.isMobile ? [ 'thumbnail', 'name', 'quantity', 'amount'] 
                                          : [ 'thumbnail', 'name', 'quantity', 'amount', 'remove']
  }

  ngOnInit() {
    this._sbS.sink = 
        this._cartService.getCart().subscribe(cart => {
          this.dataSource = cart;
          this.cartTotal = cart.map(c =>{
            const price = c.product.price;
            const count = c.count;
            return price * count
          }).reduce((a,b) => a+b,0)
        });
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
