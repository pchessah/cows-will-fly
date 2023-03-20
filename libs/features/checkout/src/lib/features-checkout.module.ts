import { NgModule } from                         '@angular/core';
import { CommonModule } from                     '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesCartModule } from               '@cows-will-fly/features/cart';
import { AngularMaterialModule} from             '@cows-will-fly/elements/external';
import { ElementsCommonUiModule} from            '@cows-will-fly/elements/common-ui';
import { CheckOutPageComponent } from            './pages/checkout-page/checkout.page.component';
import { CheckOutRoutingModule } from            './checkout.routing.module';
import { CheckoutFormComponent } from            './components/checkout-form/checkout-form.component';
import { NgxMatIntlTelInputComponent  } from "ngx-mat-intl-tel-input";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckOutRoutingModule,
    AngularMaterialModule,
    ElementsCommonUiModule,
    FeaturesCartModule,
    NgxMatIntlTelInputComponent
  ],
  declarations:[CheckOutPageComponent, CheckoutFormComponent]
})

export class FeaturesCheckoutModule {}
