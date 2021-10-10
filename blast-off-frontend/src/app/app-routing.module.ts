import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MarketComponent} from './components/market/market.component';
import {AssetComponent} from './components/asset/asset.component';
import {AssetContainerComponent} from './components/asset-container/asset-container.component';

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
    path: 'assets',
    component: AssetContainerComponent,
    children: [
      {
        path: ':tokenId',
        component: AssetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
