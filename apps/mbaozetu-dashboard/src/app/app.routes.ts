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
