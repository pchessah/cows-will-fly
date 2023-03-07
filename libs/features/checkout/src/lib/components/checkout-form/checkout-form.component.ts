import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserDetails } from '@cows-will-fly/interfaces/user';

@Component({
  selector: 'app-checkout-form',
  templateUrl: 'checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})

export class CheckoutFormComponent implements OnInit {

  @Output()orderPlacedEvent: EventEmitter<IUserDetails> = new EventEmitter();

  checkoutForm: FormGroup;
 
  constructor(private _fb:FormBuilder) { 
    this.checkoutForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required]],
      phone: ['' , [ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  ngOnInit() { }

  onSubmit(checkoutForm:FormGroup){
    this.orderPlacedEvent.emit(checkoutForm.value);
  }

  check(val:string){
    return this.checkoutForm.get(val)?.invalid;
  }
}