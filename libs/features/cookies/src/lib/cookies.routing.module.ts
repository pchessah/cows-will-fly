import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.page.component';

const routes: Routes = [
  { path: '', component:PrivacyPolicyComponent }
]; 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookiesRoutingModule { }