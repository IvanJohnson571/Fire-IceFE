import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addFavorite, removeFavorite } from './favorites.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectFavorites } from './favorites.selectors';

@Injectable()
export class FavoritesEffects {

  constructor(private actions$: Actions, private store: Store) { }

  persistFavorites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addFavorite, removeFavorite),
        tap(() => {
          this.store.select(selectFavorites).subscribe((favorites) => {
            localStorage.setItem('favorites', JSON.stringify(favorites));
          });
        })
      ),
    { dispatch: false }
  );

}
