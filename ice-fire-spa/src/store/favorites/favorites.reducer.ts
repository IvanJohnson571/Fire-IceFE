import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorites.actions';

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export const initialState: any[] = loadFromLocalStorage();

export const favoritesReducer = createReducer(
  initialState,

  on(addFavorite, (state, { book }) => {
    if (state.find(b => b.url === book.url)) return state;
    return [...state, book];
  }),

  on(removeFavorite, (state, { book }) =>
    state.filter(b => b.url !== book.url)
  )
);
