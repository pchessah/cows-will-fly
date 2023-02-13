import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';

import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [NavbarComponent, BannerComponent],
  exports:[NavbarComponent, BannerComponent]
})
export class ElementsCommonUiModule {}
