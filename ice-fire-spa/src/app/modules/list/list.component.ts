import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  books: any[] = [];
  loading = true;

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit() {
    this.listService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
        this.loading = false;
      }
    });
  }

  openDetail(book: any) {
    const id = book.url.split('/').pop();
    this.router.navigate(['/detail', id]);
  }
}
