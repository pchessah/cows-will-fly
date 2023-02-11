import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

const routes: Routes = [
  {path : 'home',  loadChildren: () => import('../../../../libs/features/home/src/lib/features-home.module').then(m => m.FeaturesHomeModule)},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }