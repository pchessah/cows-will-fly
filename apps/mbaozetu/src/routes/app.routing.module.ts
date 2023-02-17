import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Error404Component } from "../app/error404/error404.component";

const routes: Routes = [
  {
    //Product module
    path: "products",
    loadChildren: () =>
      import(
        "../../../../libs/features/products/src/lib/features-products.module"
      ).then((m) => m.FeaturesProductsModule),
  },

  //Home module
  {
    path: "home",
    loadChildren: () =>
      import(
        "../../../../libs/features/home/src/lib/features-home.module"
      ).then((m) => m.FeaturesHomeModule),
  },

  //Cart Module
  {
    path: "cart",
    loadChildren: () =>
      import(
        "../../../../libs/features/cart/src/lib/features-cart.module"
      ).then((m) => m.FeaturesCartModule),
  },

  //Checkout module
  {
    path: "checkout",
    loadChildren: () =>
      import(
        "../../../../libs/features/checkout/src/lib/features-checkout.module"
      ).then((m) => m.FeaturesCheckoutModule),
  },

  { path: "", redirectTo: "/home", pathMatch: "full" }, //Home route

  { path: "**", component:Error404Component } //Error404 Route
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
