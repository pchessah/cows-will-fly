import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStore } from '@cows-will-fly/state/products';
import { filter } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.component.html',
  styleUrls: ['dashboard.page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy {
  productNumber:number = 0;
  private _sbS = new SubSink();
  constructor(private _productStore: ProductStore) { }

  ngOnInit() {
    this._sbS.sink = 
        this._productStore.getProducts().pipe(filter(res => !!res)).subscribe(products =>{
          this.productNumber = products.length;
        })

  }

  ngOnDestroy(): void {
    this._sbS.unsubscribe();
  }
}