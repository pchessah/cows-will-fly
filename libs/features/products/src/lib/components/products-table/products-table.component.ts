import { OnDestroy, Component, OnInit,
         ViewChild }            from '@angular/core';
import {MatTableDataSource}     from '@angular/material/table';
import {MatPaginator}           from '@angular/material/paginator';
import { MatDialog }            from '@angular/material/dialog';
import { MatSnackBar }          from '@angular/material/snack-bar';
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

export class ProductsTableComponent implements OnInit, OnDestroy {
  private _sbs = new SubSink();
  displayedColumns: string[] = ['image', 'name', 'price', 'action'];
  dataSource = new MatTableDataSource();
  products$: Observable<IProduct[]> = null as any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //TODO: VIEW CHILD PAGINATOR
  
  constructor(private _productsStore$$: ProductStore,
              private _dialog:MatDialog,
              private _snackBar:MatSnackBar) { }

  ngOnInit() { 
    this.products$ = this._productsStore$$.getProducts() as Observable<IProduct[]>;
    this._sbs.sink = 
        this.products$.subscribe(products =>{
          this.dataSource.data = products;
        })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addProduct(){
    this._dialog.open(ProductFormComponent, {
      width: '550px',
      data: {mode:'create'}
    })
  }


  editProduct(product:IProduct){
    this._dialog.open(ProductFormComponent, {
      width: '550px',
      data: {mode:'edit', productToEdit: product}
    })
  }

  deleteProduct(product:IProduct){
    const confirm$ = window.confirm('Are you sure you want to delete '+ product.name+ '?');
    if(confirm$){
      this._sbs.sink = 
          this._productsStore$$.deleteProduct(product).subscribe(res => {
            this._snackBar.open("Product deleted successfully", "x",{
              verticalPosition:'top',
              duration: 3000
            });
          })
    } 
  }

  ngOnDestroy(): void {
    this._sbs.unsubscribe();
  }
}