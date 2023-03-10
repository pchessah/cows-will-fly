import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutStateService } from './services/checkout.service';
import { EmailCheckoutService } from './services/email-checkout.service';

@NgModule({
  imports: [CommonModule],
  
})
export class StateCheckoutModule {
  static forRoot():ModuleWithProviders<StateCheckoutModule>{
    return {
      ngModule: StateCheckoutModule,
      providers:[CheckoutStateService, EmailCheckoutService]
    }
  }
}
