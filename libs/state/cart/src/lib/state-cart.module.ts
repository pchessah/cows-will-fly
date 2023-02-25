import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class StateCartModule {
  static forRoot(): ModuleWithProviders<StateCartModule> {
    return {
      ngModule: StateCartModule,
      providers: []
    }
  }
  
}
