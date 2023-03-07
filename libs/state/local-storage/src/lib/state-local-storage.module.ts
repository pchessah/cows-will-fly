import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [CommonModule],
})
export class StateLocalStorageModule {
  static forRoot():ModuleWithProviders<StateLocalStorageModule>{
    return {
      ngModule: StateLocalStorageModule,
      providers:[LocalStorageService]
    }
  }
}
