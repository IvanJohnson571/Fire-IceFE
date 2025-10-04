import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from './services/session.service';
import { LoaderComponent } from './components/loader/component/loader.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ice-fire-spa';

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() { };

}
