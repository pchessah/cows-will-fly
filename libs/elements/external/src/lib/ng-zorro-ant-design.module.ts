import { NgModule } from "@angular/core";
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [],
  
  exports: [NzButtonModule,NzResultModule, NzSelectModule ]
})

export class NgZorroAntdesignModule { }