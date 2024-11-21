import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register/register.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {authGuard} from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    canActivate: [authGuard],
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
    path: 'product'
  },
];


