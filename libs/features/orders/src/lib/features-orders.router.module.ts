import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';
import { OrdersOverviewComponent }    from './pages/orders-overview/orders-overview.page.component';



const routes: Routes = [
  { path: 'overview', component:OrdersOverviewComponent },
  { path: "", redirectTo: "/orders/overview", pathMatch: "full" }
]; 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderssRoutingModule { }