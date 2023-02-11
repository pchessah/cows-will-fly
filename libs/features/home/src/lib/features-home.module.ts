import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home.page';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule} from '@cows-will-fly/elements/common-ui';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, HomeRoutingModule, ElementsCommonUiModule],
  declarations:[HomePageComponent],
  exports: [HomePageComponent]
})
export class FeaturesHomeModule {}
