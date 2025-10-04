import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  constructor(private sessionService: SessionService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const session = await this.sessionService.checkSession();

    if (session?.isAuthenticated) {
      await this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
