import { Route } from "@angular/router";

export const appRoutes: Route[] = [

  //Auth module
  {
    path: "auth",
    loadChildren: () =>
      import(
        "../../../../libs/features/auth/src/lib/features-auth.module"
      ).then((m) => m.FeaturesAuthModule),
  },

  {
    //Product module
    path: "products",
    loadChildren: () =>
      import(
        "../../../../libs/features/products/src/lib/features-products.module"
      ).then((m) => m.FeaturesProductsModule),
  },

    //Orders module
  {
    path: "orders",
    loadChildren: () =>
      import(
        "../../../../libs/features/orders/src/lib/features-orders.module"
      ).then((m) => m.FeaturesOrdersModule),
  },

  //Home module
  {
    path: "home",
    loadChildren: () =>
      import(
        "../../../../libs/features/home/src/lib/features-home.module"
      ).then((m) => m.FeaturesHomeModule),
  },

  { path: "", redirectTo: "/home/dashboard", pathMatch: "full" }, //Home route
];
