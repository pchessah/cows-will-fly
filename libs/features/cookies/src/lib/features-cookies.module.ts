import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ElementsExternalModule }from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule }from '@cows-will-fly/elements/common-ui';
import { CookiesRoutingModule }  from './cookies.routing.module';

@NgModule({
  imports: [CommonModule, ElementsExternalModule, ElementsCommonUiModule,
            CookiesRoutingModule],
})
export class FeaturesCookiesModule {}
