import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CartPageComponent } from './pages/cart/cart.page.component';


const routes: Routes = [
  { path: '', component:CartPageComponent }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }