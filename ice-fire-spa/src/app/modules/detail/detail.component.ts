import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListService } from '../list/services/list.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  book: any = null;
  loading = true;

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.listService.getBookById(id).subscribe({
        next: (data) => {
          this.book = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading book:', err);
          this.loading = false;
        }
      });
    }

  }

}
