import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  async login(username: string, password: string): Promise<any> {

    return await firstValueFrom(
      this.http.post(`${environment.baseUrl}api/auth/login`,
        { username, password },
        { withCredentials: true }
      )
    );
  }

}
