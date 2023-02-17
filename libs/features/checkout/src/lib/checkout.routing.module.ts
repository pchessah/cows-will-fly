import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CheckOutPageComponent } from './pages/checkout-page/checkout.page.component';

const routes: Routes = [
  { path: '', component:CheckOutPageComponent }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }