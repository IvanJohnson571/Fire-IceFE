import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { ListService } from './services/list.service';
import { selectFavorites } from '../../../store/favorites/favorites.selectors';
import { addFavorite, removeFavorite } from '../../../store/favorites/favorites.actions';
import { SharedModule } from '../shared/shared.module';
import { NotificationService } from '../../services/notification.service';
import { Book } from '../../models/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit {

  books: any[] = [];
  filteredBooks: Book[] = [];
  favorites: any[] = [];
  searchTerm = '';
  dataReady: boolean = false;

  constructor(
    private listService: ListService,
    private router: Router,
    private store: Store,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

    this.listService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data;
        this.dataReady = true;
      },
      error: (err) => {
        this.dataReady = true;
        this.notificationService.openSnackBarFailure('Failed to load books');
      }
    });

    this.store.select(selectFavorites).subscribe((favs) => (this.favorites = favs));

  }

  onSearchChange() {

    const term = this.searchTerm.toLowerCase();

    this.filteredBooks = this.books.filter(
      (book) =>
        book.name.toLowerCase().includes(term) ||
        book.authors.some((a: string) => a.toLowerCase().includes(term))
    );

  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredBooks = this.books;
  }

  openDetail(book: any): void {
    const id = book.url.split('/').pop();
    this.router.navigate(['/detail', id]);
  }

  toggleFavorite(book: any, event: MouseEvent): void {

    event.stopPropagation();
    const isFav = this.favorites.some((b) => b.url === book.url);

    if (isFav) {
      this.store.dispatch(removeFavorite({ book }));
      this.notificationService.openSnackBarSuccess('Removed from favorites successfully');

    } else {
      this.store.dispatch(addFavorite({ book }));
      this.notificationService.openSnackBarSuccess('Added to favorites successfully');

    };

  }

  isFavorite(book: any): boolean {
    return this.favorites.some((b) => b.url === book.url);
  }

}
