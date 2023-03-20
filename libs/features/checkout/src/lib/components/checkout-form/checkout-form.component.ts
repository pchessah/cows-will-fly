import { Component, EventEmitter, Input, 
         OnInit, Output, SimpleChanges }      from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { SubSink }                            from 'subsink';
import { IUserDetails }                       from '@cows-will-fly/interfaces/user';
import { AuthService }                        from '@cows-will-fly/state/auth';

@Component({
  selector: 'app-checkout-form',
  templateUrl: 'checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})

export class CheckoutFormComponent implements OnInit {

  private _sbS = new SubSink();

  @Input() isSaving:boolean = false;
  @Output() orderPlacedEvent: EventEmitter<IUserDetails> = new EventEmitter();

  checkoutForm: FormGroup;
 
  constructor(private _fb:FormBuilder,
              private _router:Router,
              private _authService: AuthService) { 
    this.checkoutForm = this._fb.group({
      name:  ['', Validators.required],
      email: ['' , [Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      phone: ['' , [ Validators.required]]
    });
  }

  ngOnInit() { 
    this._sbS.sink = 
        this._authService.getLoggedInUser().subscribe(u => {
          if(u){
            const name = this._authService.getNameFromEmail(u.email as string);
            const email = u.email;
            const id = u.uid;
            this.checkoutForm.controls['email'].setValue(email);
            this.checkoutForm.controls['name'].setValue(name);
          }
        })
  }

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