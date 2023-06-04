import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { HomeScreenComponent } from "./home-screen/home-screen.component";
import { ElementsExternalModule } from "@cows-will-fly/elements/external";

@NgModule({
  declarations: [AppComponent, HomeScreenComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: "enabledBlocking" }),
    ElementsExternalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
