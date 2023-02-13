import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router

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
  { path: "", redirectTo: "/home", pathMatch: "full" },
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
