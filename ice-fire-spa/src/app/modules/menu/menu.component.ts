import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-menu',
  imports: [SharedModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
})
export class MenuComponent {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { };

  navigate(url: string) {
    this.router.navigate([url])
  }

  logout() {
    this.sessionService.logout();
  }

}
