import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListService } from '../list/services/list.service';
import { SharedModule } from '../shared/shared.module';
import { NotificationService } from '../../services/notification.service';
import { Book } from '../../models/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  book: Book = null;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.listService.getBookById(id).subscribe({
        next: (data: Book) => {
          this.book = data;

        },
        error: (err) => {
          this.notificationService.openSnackBarFailure('Error loading book');

        }
      });
    }

  }

}
