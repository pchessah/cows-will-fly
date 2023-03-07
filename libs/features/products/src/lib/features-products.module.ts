import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "@cows-will-fly/elements/external";
import { FormsModule } from "@angular/forms";
import { ElementsCommonUiModule } from "@cows-will-fly/elements/common-ui";
import { FeaturesCartModule } from "@cows-will-fly/features/cart";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductsRoutingModule } from "./products.router.module";
import { AllProductsPageComponent } from "./pages/all-products/all-products.page.component";
import { SingleProductPageComponent } from "./pages/single-product-page/single-product.page.component";

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AngularMaterialModule,
    ElementsCommonUiModule,
    FormsModule,
    FeaturesCartModule,
  ],
  declarations: [
    ProductCardComponent,
    AllProductsPageComponent,
    SingleProductPageComponent,
  ],
})
export class FeaturesProductsModule {}
