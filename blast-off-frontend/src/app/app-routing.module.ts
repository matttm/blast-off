import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MarketComponent} from './components/market/market.component';
import {AssetComponent} from './components/asset/asset.component';

const routes: Routes = [
  { path: '', redirectTo: 'market', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  {
    path: 'market',
    component: MarketComponent,
    children: []
  },
  {
    path: 'market/:tokenId',
    component: AssetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
