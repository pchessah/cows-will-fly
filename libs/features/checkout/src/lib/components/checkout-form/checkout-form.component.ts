import { Component, EventEmitter, Input, 
         OnInit, Output, SimpleChanges }      from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { IUserDetails }                       from '@cows-will-fly/interfaces/user';

@Component({
  selector: 'app-checkout-form',
  templateUrl: 'checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})

export class CheckoutFormComponent implements OnInit {

  @Input() isSaving:boolean = false;
  @Output() orderPlacedEvent: EventEmitter<IUserDetails> = new EventEmitter();

  checkoutForm: FormGroup;
 
  constructor(private _fb:FormBuilder, private _router:Router) { 
    this.checkoutForm = this._fb.group({
      name:['', Validators.required],
      email: ['' , [Validators.email, Validators.required]],
      phone: ['' , [ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['isSaving']){
      this.isSaving = changes['isSaving']?.currentValue;
    }
  }

  onSubmit(checkoutForm:FormGroup){
    this.isSaving = true
    this.orderPlacedEvent.emit(checkoutForm.value);
  }

  check(val:string){
    return this.checkoutForm.get(val)?.invalid;
  }

  goBack(){
    this._router.navigateByUrl('/cart');
  }
}