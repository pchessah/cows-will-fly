import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { RouterModule }             from '@angular/router';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';  
import { AngularFireAuthModule }    from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule }   from '@angular/fire/compat/firestore';
import { AngularFireModule }        from "@angular/fire/compat";
import { ElementsCommonUiModule }   from '@cows-will-fly/elements/common-ui';
import { environemnt }              from '../environments/environment';
import { AppComponent }             from './app.component';
import { appRoutes }                from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environemnt.firebaseConfig),
    AngularFireModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    ElementsCommonUiModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
