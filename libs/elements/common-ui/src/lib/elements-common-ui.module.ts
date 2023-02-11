import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [NavbarComponent],
  exports:[NavbarComponent]
})
export class ElementsCommonUiModule {}
