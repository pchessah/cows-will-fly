import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent }    from './pages/home/home.page';
import { DashboardPageComponent } from './pages/dashboard/dashboard.page.component';


const routes: Routes = [
  { path: "", component:HomePageComponent },
  { path: 'dashboard', component:DashboardPageComponent }
]; 


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }