import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';
import { NavbarComponent }      from './components/navbar/navbar.component';
import { BannerComponent }      from './components/banner/banner.component';
import { SideBarComponent }     from './components/sidebar/sidebar.component';
import { ChartComponent }       from './components/chart/chart.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],

  declarations: [NavbarComponent, BannerComponent, SideBarComponent, ChartComponent],
  
  exports:[ NavbarComponent, BannerComponent, SideBarComponent,
            AngularMaterialModule, ChartComponent]
})

export class ElementsCommonUiModule {}
