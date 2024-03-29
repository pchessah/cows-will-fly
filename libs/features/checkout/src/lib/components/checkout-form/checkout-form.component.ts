import { Component, EventEmitter, Input, 
         OnInit, Output, SimpleChanges }      from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { MatSlideToggleChange }               from '@angular/material/slide-toggle';
import { MatSelectChange }                    from '@angular/material/select';
import { SubSink }                            from 'subsink';
import { IDeliveryLocation, IUserDetails }    from '@cows-will-fly/interfaces/user';
import { AuthService }                        from '@cows-will-fly/state/auth';
import { CartService }                        from '@cows-will-fly/state/cart';
import { PromoCodeService }                   from '@cows-will-fly/state/checkout';

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
  customerWantsDelivery:boolean = false;
  customerHasPromoCode:boolean = false;

  locations:IDeliveryLocation[] = [
    {name:'Nairobi CBD', cost: 500},
    {name:'Westlands, Kangemi', cost: 1300},
    {name:'Kasarani, Roysambu', cost: 1350},
    {name:'Karen, Ngong', cost: 1500},
    {name:'Eastlands', cost: 1700},
    {name:'Embakasi, Along Mombasa Road', cost: 2000},
    {name:'Outside Nairobi', cost: 5000},
  ]
 
  constructor(private _fb:FormBuilder,
              private _promoCodeService:PromoCodeService,
              private _cartService: CartService,
              private _router:Router,
              private _authService: AuthService) 
  { 
    this.checkoutForm = this._fb.group({
      name:  ['', Validators.required],
      email: ['' , [Validators.email, Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$')]],
      phone: ['' , [ Validators.required]],
      promocode: [''],
      location: ['' ],
      deliveryDetails: ['']
    });
  }

  toggle(event:MatSlideToggleChange){
    this.customerWantsDelivery = event.checked;

    if(!this.customerWantsDelivery){
      this.checkoutForm.controls['location'].setValue(null);
      this.checkoutForm.controls['deliveryDetails'].setValue(null);
      this.checkoutForm.controls['location'].removeValidators(Validators.required);
      this._cartService.resetDeliveryCost();
    } else {
      const deliveryCost = this.checkoutForm.get('location')?.value?.cost ?? 0;
      this._cartService.setDeliveryCost(deliveryCost);
      this.checkoutForm.controls['location'].setValidators(Validators.required);
    }
    this.checkoutForm.controls['location'].updateValueAndValidity();
  }

  togglePromoCode(event:MatSlideToggleChange){
    this.customerHasPromoCode = event.checked;

    if(!this.customerHasPromoCode){
      this.checkoutForm.controls['promocode'].setValue(null);
      this._promoCodeService.clearCurrentPromoCode();
      this.checkoutForm.controls['promocode'].clearValidators();
    } else {
      this.checkoutForm.controls['promocode'].setValidators(Validators.required);
    }

    this.checkoutForm.controls['promocode'].updateValueAndValidity();
    
    
  }

  onLocationSelected(event:MatSelectChange){
    const deliveryCost = event.value.cost;
    this.checkoutForm.controls['location'].setValue(event.value);
    this._cartService.setDeliveryCost(deliveryCost);
  }

  ngOnInit() { 
    this._sbS.sink = 
        this._authService.getLoggedInUser().subscribe(u => {
          if(u){
            const name = this._authService.getNameFromEmail(u.email as string);
            const email = u.email;
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

  findPromoCode(){
    const control = this.checkoutForm.controls['promocode'];
    const promoCode = control.value;
    if(!!promoCode || !!promoCode?.length){
      this._sbS.sink = 
          this._promoCodeService.getPromoCodeFromDb(promoCode).subscribe(promo =>{
            this._promoCodeService.setPromoCode(promo);
          });
    }
  }
}