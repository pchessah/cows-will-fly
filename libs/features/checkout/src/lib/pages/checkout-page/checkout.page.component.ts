import { Component, OnInit } from "@angular/core";
import { combineLatest, map }   from "rxjs";
import { Router }            from "@angular/router";
import { CartService }       from "@cows-will-fly/state/cart";
import { SubSink } from "subsink";

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

  constructor(private _router: Router, private _cartService: CartService) {}

  ngOnInit() {
    const cartNumber$ = this._cartService.getCartNumber();
    const cartTotal$ = this._cartService.getCartTotal();
    this._sbS.sink = 
        combineLatest([cartNumber$, cartTotal$]).subscribe(([cartNumber, cartTotal]) =>{
          this.noItemsInCart = cartNumber === 0;
          this.total = cartTotal
        });
  }
  
  goToHome() {
    this._router.navigateByUrl("/");
  }

  goToProducts(){
    this._router.navigateByUrl('/products');
  }

  ngOnDestroy(){
    this._sbS.unsubscribe();
  }

}
