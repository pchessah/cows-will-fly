import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }        from '@angular/material/dialog';
import { MatSnackBar }                          from '@angular/material/snack-bar';
import { SubSink }                              from 'subsink';
import { take }                                 from 'rxjs/operators';
import { ProductStore }                         from '@cows-will-fly/state/products';

@Component({
  selector: 'app-product-form',
  templateUrl: 'product-form.component.html',
  styleUrls: ['product-form.component.scss']
})

export class ProductFormComponent implements OnInit, OnDestroy {
  
  private _sbS = new SubSink();
  isLoading: boolean = false;
  productForm: FormGroup;
  image: any;
  mode: 'create' | 'edit' = 'create';
  data:any = null;

  constructor(private _fb:FormBuilder,
              private _dialogRef:MatDialogRef<ProductFormComponent>,
              private _snackBar:MatSnackBar,
              private _productStore: ProductStore,
              @Inject(MAT_DIALOG_DATA) _data:any)
  {
    this.mode = _data.mode;
    this.data = _data.productToEdit;

    this.productForm = this._fb.group({
      name:[this.data && this.data.name ? this.data.name : "", Validators.required],
      price:[this.data && this.data.price ? this.data.price : "", Validators.required],
      description:[this.data && this.data.description ? this.data.description : "", Validators.required]
    })
  }

  ngOnInit() { }

  submit(){
    this.isLoading = true;
    if(this.mode === 'create'){
      if(this.productForm.valid && !!this.image){
        this._sbS.sink = 
            this._productStore.addProduct(this.productForm.value, this.image).pipe(take(1)).subscribe(res => {
  
              this._dialogRef.close();
  
              this._snackBar.open('🎉 Product added successfully', 'x', {
                verticalPosition: 'top',
                duration: 3000
              })
            });
      }
    } else {
      const productToBeEdited = {id: this.data.id, ...this.productForm.value }
      this._sbS.sink = 
          this._productStore.editProduct(productToBeEdited, this.image ?? null).pipe(take(1)).subscribe(res =>{
            this._dialogRef.close();
  
              this._snackBar.open('🎉 Product edited successfully', 'x', {
                verticalPosition: 'top',
                duration: 3000
              })
          })
    }
  }

  check(cntrlName:string){
    return this.productForm.get(cntrlName)?.invalid;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.image = file;
  }

  ngOnDestroy(): void {
    this._sbS.unsubscribe();
  }
  
}