import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentUser: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifications: NotificationService
  ) { }

  private getBaseUrl(): string {
    const w = window as any;
    if (w.Cypress) {
      return environment.cypressBaseUrl;
    }
    return environment.baseUrl;
  }

  async login(username: string, password: string) {
    try {
      await firstValueFrom(
        this.http.post(`${this.getBaseUrl()}api/auth/login`, { username, password }, { withCredentials: true })
      );

      const session: any = await firstValueFrom(
        this.http.get(`${this.getBaseUrl()}api/auth/session`, { withCredentials: true })
      );

      if (session?.isAuthenticated) {
        this.currentUser = session.user;
        this.router.navigateByUrl('/');
        this.notifications.openSnackBarSuccess('Login successful');
      } else {
        this.router.navigateByUrl('/login');
      }

    } catch (err) {
      this.notifications.openSnackBarFailure('Login failed');
    }
  }

  async checkSession() {
    try {
      const session: any = await firstValueFrom(
        this.http.get(`${this.getBaseUrl()}api/auth/session`, { withCredentials: true })
      );
      this.currentUser = session.user;
      return session;
    } catch {
      this.currentUser = null;
      return { isAuthenticated: false };
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('token');
      await firstValueFrom(
        this.http.post(`${this.getBaseUrl()}api/auth/logout`, {}, { withCredentials: true })
      );
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      this.router.navigateByUrl('/login');
    }
  }

  async register(username: string, password: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${this.getBaseUrl()}api/auth/register`, { username, password })
      );
      alert('Registration successful! You can now log in.');
    } catch (err) {
      throw err;
    }
  }
}
