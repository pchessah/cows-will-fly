import { Component, OnInit } from "@angular/core";
import { map }   from "rxjs";
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

  constructor(private _router: Router, private _cartService: CartService) {}

  ngOnInit() {
    this._sbS.sink = 
        this._cartService.getCartNumber().pipe(map(n =>  n === 0 )).subscribe(bool =>{
          this.noItemsInCart = bool;
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
