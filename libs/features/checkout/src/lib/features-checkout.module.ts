import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule} from '@cows-will-fly/elements/common-ui';
import { CheckOutPageComponent } from './pages/checkout-page/checkout.page.component';
import { CheckOutRoutingModule } from './checkout.routing.module';

@NgModule({
  imports: [CommonModule,CheckOutRoutingModule, AngularMaterialModule, ElementsCommonUiModule],
  declarations:[CheckOutPageComponent]
})

export class FeaturesCheckoutModule {}
