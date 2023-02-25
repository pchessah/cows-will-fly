import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from './stores/products.store';

@NgModule({
  imports: [CommonModule],
})
export class StateProductsModule {
  static forRoot(): ModuleWithProviders<StateProductsModule> {
    return {
      ngModule: StateProductsModule,
      providers: [ ProductStore
       
      ]
    };
  }
  
}

