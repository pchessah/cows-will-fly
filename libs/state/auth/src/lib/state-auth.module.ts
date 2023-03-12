import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { AuthService }                   from './services/auth.service';

@NgModule({
  imports: [CommonModule],
})
export class StateAuthModule {
  static forRoot():ModuleWithProviders<StateAuthModule>{
    return {
      ngModule: StateAuthModule,
      providers: [AuthService]
    }
  }
}
