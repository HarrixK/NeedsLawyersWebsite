import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { Home } from './components/home/home';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';


const routes: Routes = [
  { path: '', component: Home },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, 
    scrollPositionRestoration: 'top' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}