import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { Home } from './components/home/home';


const routes: Routes = [
  { path: '', component: Home },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'top' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }