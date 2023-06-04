import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { NgZorroAntdesignModule } from './ng-zorro-ant-design.module';

@NgModule({
  imports: [CommonModule],
  exports:[AngularMaterialModule, NgZorroAntdesignModule]
})
export class ElementsExternalModule {}
