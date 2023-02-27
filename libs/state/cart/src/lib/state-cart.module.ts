import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [CommonModule],
})
export class StateCartModule {
  static forRoot(): ModuleWithProviders<StateCartModule> {
    return {
      ngModule: StateCartModule,
      providers: [CartService]
    }
  }
  
}
