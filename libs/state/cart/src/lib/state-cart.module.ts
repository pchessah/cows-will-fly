import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { ElementsExternalModule }        from '@cows-will-fly/elements/external';
import { CartService }                   from './services/cart.service';

@NgModule({
  imports: [CommonModule, ElementsExternalModule],
})
export class StateCartModule {
  static forRoot(): ModuleWithProviders<StateCartModule> {
    return {
      ngModule: StateCartModule,
      providers: [CartService]
    }
  }
  
}
