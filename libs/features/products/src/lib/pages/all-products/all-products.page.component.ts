import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: 'all-products.page.component.html',
  styleUrls:['./all-products.page.component.scss']
})

export class AllProductsPageComponent implements OnInit {

productCount: any[] = []
  
  constructor() {
    this.productCount = new Array(50);
   }

  ngOnInit() { }
}