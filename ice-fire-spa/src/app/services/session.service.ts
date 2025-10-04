import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  async checkSession(): Promise<boolean> {
    try {
      const session: any = await firstValueFrom(
        this.http.get(`${environment.baseUrl}api/auth/session`, { withCredentials: true })
      );
      return !!session?.isAuthenticated;
    } catch {
      return false;
    }
  }

  sendGetRequestPlus(data: { path: string, params?: any }) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });

    if (!environment.production) {
      headers = undefined as any;
    }

    return this.http.get(
      `${environment.baseUrl}api/${data.path}${this.parseQueryString(data.params)}`,
      { headers, observe: 'response', withCredentials: true }
    );
  }

  private parseQueryString(model: any) {
    if (!model) return '';
    const qsParams = Object.entries(model)
      .filter(([_, val]) => val != null && val != undefined)
      .map(([key, val]) => {
        if (val instanceof Date) val = val.toISOString();
        return `${key}=${val}`;
      });
    return qsParams.length ? '?' + qsParams.join('&') : '';
  }
}
