import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/products.service';

@NgModule({
  imports: [CommonModule],
})
export class StateProductsModule {
  static forRoot(): ModuleWithProviders<StateProductsModule> {
    return {
      ngModule: StateProductsModule,
      providers: [ ProductService
       
      ]
    };
  }
  
}

