import { NgModule, isDevMode }       from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';  
import { MatButtonModule }           from '@angular/material/button';
import { AngularFireAuthModule }     from "@angular/fire/compat/auth";
import { AngularFireStorageModule }  from '@angular/fire/compat/storage';
import { AngularFirestoreModule }    from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule }         from "@angular/fire/compat";
import { ServiceWorkerModule }       from '@angular/service-worker';
import { HttpClientModule }          from '@angular/common/http';

import { FeaturesHomeModule}         from '@cows-will-fly/features/home';
import { StateProductsModule }       from '@cows-will-fly/state/products';
import { StateCartModule }           from '@cows-will-fly/state/cart';
import { StateCheckoutModule }       from '@cows-will-fly/state/checkout';
import { StateLocalStorageModule }   from "@cows-will-fly/state/local-storage";
import { StateAuthModule }           from "@cows-will-fly/state/auth";
import { FeaturesCookiesModule }     from '@cows-will-fly/features/cookies';
// import { FeaturesLangchainModule }   from '@cows-will-fly/features/langchain';

import { AppRoutingModule }          from '../routes/app.routing.module';

import { Error404Component }         from './error404/error404.component';
import { AppComponent }              from './app.component';
import { environment } from './environments/environment';

@NgModule({
  declarations: [AppComponent, Error404Component],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    FeaturesHomeModule,
    FeaturesCookiesModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    
    // FeaturesLangchainModule.forRoot(),
    StateCheckoutModule.forRoot(),
    StateProductsModule.forRoot(),
    StateCartModule.forRoot(),
    StateLocalStorageModule.forRoot(),
    StateAuthModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
   ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
