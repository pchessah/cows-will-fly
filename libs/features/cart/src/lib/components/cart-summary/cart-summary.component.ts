import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: 'cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})

export class CartSummaryComponent implements OnInit {
  @Input()isSingleProductPage: boolean = false;

  displayedColumns: string[] = ['name', 'quantity', 'amount', 'remove'];
  dataSource = products;

  constructor() { }

  ngOnInit() { 
    this.displayedColumns = this.isSingleProductPage ? ['name','remove'] : ['name', 'quantity', 'amount', 'remove']
  }

}


const products: any[] = [
  {quantity: 1, name: 'Chair', amount: 12},
  {quantity: 2, name: 'Table', amount: 130},
  {quantity: 3, name: 'Desk', amount: 10}
];