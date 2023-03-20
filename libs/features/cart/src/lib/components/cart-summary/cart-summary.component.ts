import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubSink } from 'subsink';
import { ICart } from '@cows-will-fly/interfaces/cart';
import { CartService } from '@cows-will-fly/state/cart';
import { IProduct } from '@cows-will-fly/interfaces/product';

@Component({
  selector: 'app-cart-summary',
  templateUrl: 'cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})

export class CartSummaryComponent implements OnInit, OnChanges{
  private _sbS = new SubSink();

  @Input()isSingleProductPage: boolean = false;
  @Input() isCheckOutPage: boolean = false;

  displayedColumns!: string[];
  dataSource: ICart[] = [];

  constructor(private _cartService: CartService) { 
    this._initDisplayedColumns();
   
  }

  ngOnInit() {
    this._sbS.sink = 
        this._cartService.getCart().subscribe(cart => this.dataSource = cart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._initDisplayedColumns();
  }

  clearItemFromCart(item:IProduct){
    this._cartService.clearItemFromCart(item);
  }

  private _initDisplayedColumns(){
    if(this.isSingleProductPage){
      this.displayedColumns = [ 'thumbnail', 'name', 'quantity', 'remove'];
      return
    }

    if(this.isCheckOutPage){
      this.displayedColumns =  ['thumbnail', 'name', 'quantity', 'amount'];
      return
    }
 
    this.displayedColumns =  [ 'thumbnail', 'name', 'quantity', 'amount', 'remove'];
  
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
