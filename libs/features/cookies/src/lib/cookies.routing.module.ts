import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router'; // CLI imports router
import { PrivacyPolicyPageComponent } from './pages/privacy-policy/privacy-policy.page.component';

const routes: Routes = [
  { path: '', component:PrivacyPolicyPageComponent }
]; 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookiesRoutingModule { }