import { Routes } from '@angular/router';
import { ListComponent } from './modules/list/list.component';
import { LoginPageComponent } from './modules/login-page/login-page.component';
import { MenuComponent } from './modules/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListComponent },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./modules/detail/detail.component').then(m => m.DetailComponent),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./modules/favorites/favorites.component').then(m => m.FavoritesComponent),
      },
    ]
  },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
  {
    path: '**',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  }
];
