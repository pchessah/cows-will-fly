import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class StateProductsModule {
  static forRoot(): ModuleWithProviders<StateProductsModule> {
    return {
      ngModule: StateProductsModule,
      providers: [
       
      ]
    };
  }
  
}

