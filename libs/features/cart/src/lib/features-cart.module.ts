import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule} from '@cows-will-fly/elements/common-ui';

import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartPageComponent } from './pages/cart/cart.page.component';
import { CartRoutingModule } from './features-cart.routing.module';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, ElementsCommonUiModule, CartRoutingModule],
  declarations: [CartSummaryComponent, CartPageComponent],
  exports:[CartSummaryComponent]
})

export class FeaturesCartModule { }
