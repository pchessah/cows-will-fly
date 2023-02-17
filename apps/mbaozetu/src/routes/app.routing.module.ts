import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { Error404Component } from "../app/error404/error404.component";

const routes: Routes = [
  {
    path: "products",
    loadChildren: () =>
      import(
        "../../../../libs/features/products/src/lib/features-products.module"
      ).then((m) => m.FeaturesProductsModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import(
        "../../../../libs/features/home/src/lib/features-home.module"
      ).then((m) => m.FeaturesHomeModule),
  },
  {
    path: "cart",
    loadChildren: () =>
      import(
        "../../../../libs/features/cart/src/lib/features-cart.module"
      ).then((m) => m.FeaturesCartModule),
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {path: "**", component:Error404Component}
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
