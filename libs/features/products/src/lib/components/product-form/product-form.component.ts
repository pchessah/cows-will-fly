import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-form',
  templateUrl: 'product-form.component.html',
  styleUrls: ['product-form.component.scss']
})

export class ProductFormComponent implements OnInit {
  
  private _sbS = new SubSink();

  isLoading: boolean = false;
  productForm: FormGroup;

  constructor(private _fb:FormBuilder) {
    this.productForm = this._fb.group({
      name:["", Validators.required],
      price:["", Validators.required],
      description:["", Validators.required]
    })
  }

  ngOnInit() { }

  submit(){
    if(this.productForm.valid){
      debugger
    }
  }

  check(cntrlName:string){
    return this.productForm.get(cntrlName)?.invalid;
  }
}