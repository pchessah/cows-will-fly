import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  constructor(private _router:Router) { }

  ngOnInit() { }

  goToProduct(){
    //TODO: ADD PRODUCT ID TO ROUTE
    this._router.navigateByUrl('/products/1')

  }
}