import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from './file-upload.service';

@NgModule({
  imports: [CommonModule],
})
export class StateFileUploadModule {
  static forRoot(): ModuleWithProviders<StateFileUploadModule>{
    return{
      ngModule: StateFileUploadModule,
      providers:[FileUploadService]

    }
  }
}
