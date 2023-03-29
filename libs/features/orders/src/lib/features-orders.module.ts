import { NgModule }                         from "@angular/core";
import { CommonModule }                     from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgOptimizedImage }                 from '@angular/common';
import { AngularMaterialModule }            from "@cows-will-fly/elements/external";
import { ElementsCommonUiModule }           from "@cows-will-fly/elements/common-ui";
import { FeaturesCartModule }               from "@cows-will-fly/features/cart";
import { OrdersFormComponent }              from './components/orders-form/orders-form.component';
import { OrdersOverviewComponent }          from "./pages/orders-overview/orders-overview.page.component";
import { OrdersTableComponent }             from "./components/orders-table/orders-table.component";
import { OrderssRoutingModule }             from "./features-orders.router.module";

@NgModule({
  imports: [ CommonModule,FeaturesCartModule, ElementsCommonUiModule,
             AngularMaterialModule, NgOptimizedImage, FormsModule,
             ReactiveFormsModule, OrderssRoutingModule],

  declarations:[OrdersFormComponent, OrdersOverviewComponent, OrdersTableComponent],

  exports:[OrdersFormComponent, OrdersOverviewComponent, OrdersTableComponent]
})

export class FeaturesOrdersModule {}
