import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFirestoreModule }   from '@angular/fire/compat/firestore';
import { AngularFireModule }        from "@angular/fire/compat";

import { AppComponent } from "./app.component";

import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { HomeScreenComponent } from "./home-screen/home-screen.component";
import { ElementsExternalModule } from "@cows-will-fly/elements/external";
import { StatePwaModule } from "@cows-will-fly/state/pwa";
import { environemnt } from "../environments/environment";

@NgModule({
  declarations: [AppComponent, HomeScreenComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environemnt.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(appRoutes, { initialNavigation: "enabledBlocking" }),
    ElementsExternalModule,
    StatePwaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
