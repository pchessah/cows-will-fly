import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AllProductsPageComponent } from './pages/all-products/all-products.page.component';


const routes: Routes = [
  { path: '', component:AllProductsPageComponent }
]; 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }