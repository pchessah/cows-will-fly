import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';
import { AllProductsPageComponent }   from './pages/all-products/all-products.page.component';
import { SingleProductPageComponent } from './pages/single-product-page/single-product.page.component';
import { ProductsOverviewComponent }  from './pages/products-overview/products-overview.component';


const routes: Routes = [
  { path: '', component:AllProductsPageComponent },
  { path: ':id', component: SingleProductPageComponent},
  { path: 'overview', component: ProductsOverviewComponent}
]; 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }