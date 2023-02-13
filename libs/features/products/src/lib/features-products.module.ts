import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule} from '@cows-will-fly/elements/external';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsRoutingModule } from './products.router.module';
import { AllProductsPageComponent } from './pages/all-products/all-products.page.component';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, AngularMaterialModule],
  declarations:[ProductCardComponent, AllProductsPageComponent]
})
export class FeaturesProductsModule {}
