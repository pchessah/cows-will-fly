import { Component, Input, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ICart } from '@cows-will-fly/interfaces/cart';
import { CartService } from '@cows-will-fly/state/cart';
import { IProduct } from '@cows-will-fly/interfaces/product';

@Component({
  selector: 'app-cart-summary',
  templateUrl: 'cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})

export class CartSummaryComponent implements OnInit {
  private _sbS = new SubSink();

  @Input()isSingleProductPage: boolean = false;

  displayedColumns: string[] = ['name', 'quantity', 'amount', 'remove'];
  dataSource: ICart[] = [];

  constructor(private _cartService: CartService) { }

  ngOnInit() { 
    this.displayedColumns = this.isSingleProductPage ? ['name','remove'] : ['name', 'quantity', 'amount', 'remove'];
    this._sbS.sink = 
        this._cartService.getCart().subscribe(cart => this.dataSource = cart);
  }

  removeItemFromCart(item:IProduct){
    this._cartService.removeItemFromCart(item);
  }

  ngOnDestroy(){
    this._sbS.unsubscribe();
  }

}
