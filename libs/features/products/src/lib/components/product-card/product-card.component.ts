import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '@cows-will-fly/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  constructor(private _router:Router) { }

  @Input() product!:IProduct;


  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['product']){
      this.product = changes['product'].currentValue;
    }
  }

  goToProduct(){
    //TODO: ADD PRODUCT ID TO ROUTE
    this._router.navigateByUrl('/products/1')

  }
}