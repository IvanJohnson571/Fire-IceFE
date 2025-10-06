import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../../../store/favorites/favorites.selectors';
import { removeFavorite } from '../../../store/favorites/favorites.actions';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorites$ = this.store.select(selectFavorites);

  constructor(private store: Store) { }

  remove(book: any) {
    this.store.dispatch(removeFavorite({ book }));
  }
}
