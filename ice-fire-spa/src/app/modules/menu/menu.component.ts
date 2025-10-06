import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule, RouterOutlet, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  activeRoute = '/';

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
    this.activeRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  navigate(url: string) {
    this.router.navigate([url]);
    this.activeRoute = url;
  }

  isActive(url: string) {
    return this.activeRoute === url;
  }

  logout() {
    this.sessionService.logout();
  }
}
