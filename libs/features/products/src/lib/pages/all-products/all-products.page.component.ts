import { Component, OnInit } from '@angular/core';
import { IProduct } from '@cows-will-fly/interfaces/product';
import { ProductService} from '@cows-will-fly/state/products'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: 'all-products.page.component.html',
  styleUrls:['./all-products.page.component.scss']
})

export class AllProductsPageComponent implements OnInit {


products$!: Observable<IProduct[]>
  
  constructor(private _productService: ProductService) {
    this.products$ = _productService.products$
   }

  ngOnInit() {}
}