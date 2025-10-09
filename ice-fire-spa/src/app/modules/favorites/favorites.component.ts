import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { selectFavorites } from '../../../store/favorites/favorites.selectors';
import { removeFavorite } from '../../../store/favorites/favorites.actions';
import { SharedModule } from '../shared/shared.module';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { Book } from '../../models/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  favorites$ = this.store.select(selectFavorites);

  constructor(
    private store: Store,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  remove(book: Book) {
    this.store.dispatch(removeFavorite({ book }));
    this.notificationService.openSnackBarSuccess('Removed from favorites successfully');

  }

  openDetail(book: Book): void {
    const id = book.url.split('/').pop();
    this.router.navigate(['/detail', id]);
  }

}
