import { Router }                                 from "@angular/router";
import { Component, OnInit }                      from "@angular/core";
import { combineLatest }                          from "rxjs";
import { SubSink }                                from "subsink";
import { CartService }                            from "@cows-will-fly/state/cart";
import { IPromoCode, IUserDetails }               from "@cows-will-fly/interfaces/user";
import { CheckoutStateService, PromoCodeService}  from "@cows-will-fly/state/checkout";
import { ICart }                                  from "@cows-will-fly/interfaces/cart";

@Component({
  selector: "app-checkout",
  templateUrl: "checkout.page.component.html",
  styleUrls: ["./checkout.page.component.scss"],
})

export class CheckOutPageComponent implements OnInit {
  private _sbS = new SubSink()

  orderIsPending: boolean = true;
  noItemsInCart: boolean = true;
  total: number = 0;
  cart: ICart[] = [];
  isSaving:boolean = false;
  currentPromoCode: IPromoCode = null as any;

  constructor(private _router: Router,
              private _promoCodeService: PromoCodeService,
              private _checkOutService: CheckoutStateService,
              private _cartService: CartService) {}

  ngOnInit() {
    const cartTotal$ = this._cartService.getCartTotal();
    const cart$ = this._cartService.getCart();
    const currentPromocode$ = this._promoCodeService.getCurrentPromoCode();
    this._sbS.sink = 
        combineLatest([ cartTotal$, cart$, currentPromocode$]).subscribe(([ cartTotal, cart, currentPromoCode]) =>{
          this.noItemsInCart = cart.length === 0;
          this.currentPromoCode = currentPromoCode;
          this.total = cartTotal - this.currentPromoCode?.value ?? 0;
          this.cart = cart;
        });
  }
  
  goToHome() {
    this._router.navigateByUrl("/");
  }

  goToProducts(){
    this._router.navigateByUrl('/products');
  }

  placeOrder(userDetailsFormVal:IUserDetails){
    this.isSaving = true;
    this._sbS.sink = 
        this._checkOutService.createOrder(this.cart, userDetailsFormVal).subscribe(res => {
          this.orderIsPending = false;
          this._cartService.clearCart(true);
          this.isSaving = false;
        })
    }
  ngOnDestroy(){
    this._sbS.unsubscribe();
  }

}
