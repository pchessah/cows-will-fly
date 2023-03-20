import { Router }               from "@angular/router";
import { Component, OnInit }    from "@angular/core";
import { combineLatest }        from "rxjs";
import { SubSink }              from "subsink";
import { CartService }          from "@cows-will-fly/state/cart";
import { IUserDetails }         from "@cows-will-fly/interfaces/user";
import { CheckoutStateService}  from "@cows-will-fly/state/checkout";
import { ICart }                from "@cows-will-fly/interfaces/cart";

@Component({
  selector: "app-checkout",
  templateUrl: "checkout.page.component.html",
  styleUrls: ["./checkout.page.component.scss"],
})

export class CheckOutPageComponent implements OnInit {
  private _sbS = new SubSink()

  orderIsPending: boolean = true;
  noItemsInCart: boolean = false;
  total: number = 0;
  cart: ICart[] = [];
  isSaving:boolean = false;

  constructor(private _router: Router,
              private _checkOutService: CheckoutStateService,
              private _cartService: CartService) {}

  ngOnInit() {
    const cartTotal$ = this._cartService.getCartTotal();
    const cart$ = this._cartService.getCart();
    this._sbS.sink = 
        combineLatest([ cartTotal$, cart$]).subscribe(([ cartTotal, cart]) =>{
          this.noItemsInCart = cart.length === 0;
          this.total = cartTotal;
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
