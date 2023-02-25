import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';  
import { MatButtonModule } from '@angular/material/button';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from "@angular/fire/compat";

import { FeaturesHomeModule} from '@cows-will-fly/features/home';
import { StateProductsModule } from '@cows-will-fly/state/products';
import { StateCartModule } from '@cows-will-fly/state/cart';

import { AppComponent } from './app.component';
import { AppRoutingModule } from '../routes/app.routing.module';
import { Error404Component } from './error404/error404.component';
import { environemnt } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, Error404Component],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    FeaturesHomeModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environemnt.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    StateProductsModule.forRoot(),
    StateCartModule.forRoot()
   ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
