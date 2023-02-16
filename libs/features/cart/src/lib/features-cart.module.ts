import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule} from '@cows-will-fly/elements/common-ui';

import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, ElementsCommonUiModule],
  declarations: [CartSummaryComponent],
  exports:[CartSummaryComponent]
})

export class FeaturesCartModule { }
