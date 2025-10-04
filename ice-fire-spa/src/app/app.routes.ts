import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { DetailComponent } from './modules/detail/detail.component';
import { FavoritesComponent } from './modules/favorites/favorites.component';
import { HomeComponent } from './modules/home/home.component';
import { ListComponent } from './modules/list/list.component';
import { LoginPageComponent } from './modules/login-page/login-page.component';
import { MenuComponent } from './modules/menu/menu.component';

export const routes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'list', component: ListComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'favorites', component: FavoritesComponent },
    ]
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
