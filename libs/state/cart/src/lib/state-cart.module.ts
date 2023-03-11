import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { MatSnackBarModule }             from '@angular/material/snack-bar';
import { CartService }                   from './services/cart.service';

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
})
export class StateCartModule {
  static forRoot(): ModuleWithProviders<StateCartModule> {
    return {
      ngModule: StateCartModule,
      providers: [CartService]
    }
  }
  
}
