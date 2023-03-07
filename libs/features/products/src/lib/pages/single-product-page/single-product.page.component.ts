import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IProduct } from '@cows-will-fly/interfaces/product';
import { ProductStore } from '@cows-will-fly/state/products';

@Component({
  selector: 'app-single-product',
  templateUrl: 'single-product.page.component.html',
  styleUrls: ['./single-product.page.component.scss']
})

export class SingleProductPageComponent implements OnInit {
  product!: IProduct;
  isLoaded: boolean = false;
  singleProduct$!: Observable<IProduct>;


  constructor(private _activatedRoute: ActivatedRoute,
              private _productStore: ProductStore) { }

  ngOnInit() { 
    this._loadDataFromRoute();
  }

  private _loadDataFromRoute(){
   const p = this._activatedRoute.params
                        .pipe(switchMap(params =>{
                                  const id = params['id'];
                                  return this._productStore.getOneProduct(id)}));
  this.singleProduct$ = p as Observable<IProduct>;
                    
  }
}