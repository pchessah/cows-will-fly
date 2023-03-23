import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ElementsExternalModule }       from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule }       from '@cows-will-fly/elements/common-ui';
import { CookiesRoutingModule }         from './cookies.routing.module';
import { PrivacyPolicyBannerComponent } from './components/privacy-policy-banner/privacy-policy-banner.component';
import { PrivacyPolicyPageComponent }   from './pages/privacy-policy/privacy-policy.page.component';

@NgModule({
  imports: [CommonModule, ElementsExternalModule, ElementsCommonUiModule,
            CookiesRoutingModule],
  declarations: [PrivacyPolicyBannerComponent, PrivacyPolicyPageComponent],
  exports: [PrivacyPolicyBannerComponent]
})
export class FeaturesCookiesModule {}
