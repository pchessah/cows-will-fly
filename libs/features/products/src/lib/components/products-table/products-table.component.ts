import { AfterViewInit, Component, OnInit,
         ViewChild }            from '@angular/core';
import {MatTableDataSource}     from '@angular/material/table';
import {MatPaginator}           from '@angular/material/paginator';
import { MatDialog }            from '@angular/material/dialog';
import { Observable }           from 'rxjs';
import { SubSink }              from 'subsink';
import { IProduct }             from '@cows-will-fly/interfaces/product';
import { ProductStore }         from '@cows-will-fly/state/products';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products-table',
  templateUrl: 'products-table.component.html',
  styleUrls: ['products-table.component.scss']
})

export class ProductsTableComponent implements OnInit, AfterViewInit {
  private _sbs = new SubSink();
  displayedColumns: string[] = ['image', 'name', 'price', 'action'];
  dataSource = new MatTableDataSource();
  products$: Observable<IProduct[]> = null as any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _productsStore$$: ProductStore, private _dialog:MatDialog) { }

  ngOnInit() { 
    this.products$ = this._productsStore$$.getProducts() as Observable<IProduct[]>;
  }


  ngAfterViewInit() {
    this._sbs.sink = 
    this.products$.subscribe(products =>{
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
    })
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addProduct(){
    this._dialog.open(ProductFormComponent, {
      width: '550px'
    })

  }
}