import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailComponent } from './modules/detail/detail.component';
import { FavoritesComponent } from './modules/favorites/favorites.component';
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
      { path: 'detail/:id', component: DetailComponent },
      { path: 'favorites', component: FavoritesComponent },
    ]
  },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
  { path: '**', component: PageNotFoundComponent }
];
