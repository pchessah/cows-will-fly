import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';  

import { FeaturesHomeModule} from '@cows-will-fly/features/home'

import { AppComponent } from './app.component';
import { AppRoutingModule } from '../routes/app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FeaturesHomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
