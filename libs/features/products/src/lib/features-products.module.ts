import { NgModule }                         from "@angular/core";
import { CommonModule }                     from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgOptimizedImage }                 from '@angular/common';
import { AngularMaterialModule }            from "@cows-will-fly/elements/external";
import { ElementsCommonUiModule }           from "@cows-will-fly/elements/common-ui";
import { FeaturesCartModule }               from "@cows-will-fly/features/cart";
import { ProductCardComponent }             from "./components/product-card/product-card.component";
import { ProductsRoutingModule }            from "./products.router.module";
import { AllProductsPageComponent }         from "./pages/all-products/all-products.page.component";
import { SingleProductPageComponent }       from "./pages/single-product-page/single-product.page.component";
import { ProductsOverviewComponent }        from "./pages/products-overview/products-overview.component";
import { ProductsTableComponent }           from "./components/products-table/products-table.component";
import { ProductFormComponent }             from "./components/product-form/product-form.component";

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AngularMaterialModule,
    ElementsCommonUiModule,
    FormsModule,
    FeaturesCartModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],

  declarations: [
    ProductCardComponent,
    AllProductsPageComponent,
    SingleProductPageComponent,
    ProductsOverviewComponent,
    ProductsTableComponent,
    ProductFormComponent
  ],
})
export class FeaturesProductsModule {}
