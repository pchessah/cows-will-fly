import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { CheckoutStateService }          from './services/checkout.service';
import { EmailCheckoutService }          from './services/email-checkout.service';
import { PromoCodeService }              from './services/promocodes.service';

@NgModule({
  imports: [CommonModule],
  
})
export class StateCheckoutModule {
  static forRoot():ModuleWithProviders<StateCheckoutModule>{
    return {
      ngModule: StateCheckoutModule,
      providers:[CheckoutStateService, EmailCheckoutService, PromoCodeService]
    }
  }
}
