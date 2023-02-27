import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '@cows-will-fly/interfaces/product';
import { ProductStore} from '@cows-will-fly/state/products'

@Component({
  selector: 'app-all-products',
  templateUrl: 'all-products.page.component.html',
  styleUrls:['./all-products.page.component.scss']
})

export class AllProductsPageComponent implements OnInit {

  products$!: Observable<IProduct[]>
  
  constructor(private _productsStore$$: ProductStore) { }

  ngOnInit() {
    this.products$ = this._productsStore$$.getProducts() as Observable<IProduct[]>;
  }
}