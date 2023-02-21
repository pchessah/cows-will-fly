import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: 'checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})

export class CheckoutFormComponent implements OnInit {

  @Output()orderPlacedEvent: EventEmitter<boolean> = new EventEmitter();

  checkoutForm: FormGroup;
 
  constructor(private _fb:FormBuilder) { 
    this.checkoutForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required]],
      phone: ['' , [ Validators.required]]
    });
  }

  ngOnInit() { }

  onSubmit(checkoutForm:any){
    this.orderPlacedEvent.emit(true);
  
  }
}