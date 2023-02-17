import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';  
import { MatButtonModule } from '@angular/material/button';

import { FeaturesHomeModule} from '@cows-will-fly/features/home'

import { AppComponent } from './app.component';
import { AppRoutingModule } from '../routes/app.routing.module';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [AppComponent, Error404Component],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FeaturesHomeModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
