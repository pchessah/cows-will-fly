import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { AngularMaterialModule}    from '@cows-will-fly/elements/external';
import { ElementsCommonUiModule}   from '@cows-will-fly/elements/common-ui';
import { HomeRoutingModule }       from './home.routing.module';
import { HomePageComponent }       from './pages/home/home.page';
import { DashboardPageComponent }  from './pages/dashboard/dashboard.page.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';

@NgModule({
  imports: [ CommonModule, AngularMaterialModule, HomeRoutingModule,
             ElementsCommonUiModule],

  declarations:[HomePageComponent, DashboardPageComponent, DashboardChartComponent],
  
  exports: [HomePageComponent, DashboardPageComponent, DashboardChartComponent]
})
export class FeaturesHomeModule {}
