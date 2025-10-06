import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { ListService } from './services/list.service';
import { selectFavorites } from '../../../store/favorites/favorites.selectors';
import { addFavorite, removeFavorite } from '../../../store/favorites/favorites.actions';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  favorites: any[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private listService: ListService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
    this.listService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
        this.loading = false;
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

  clearSearch() {
    this.searchTerm = '';
    this.filteredBooks = this.books;
  }

  openDetail(book: any) {
    const id = book.url.split('/').pop();
    this.router.navigate(['/detail', id]);
  }

  toggleFavorite(book: any, event: MouseEvent) {
    event.stopPropagation();
    const isFav = this.favorites.some((b) => b.url === book.url);
    if (isFav) this.store.dispatch(removeFavorite({ book }));
    else this.store.dispatch(addFavorite({ book }));
  }

  isFavorite(book: any) {
    return this.favorites.some((b) => b.url === book.url);
  }
}
