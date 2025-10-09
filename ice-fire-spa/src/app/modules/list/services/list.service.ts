import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Book } from '../../../models/common';

@Injectable({ providedIn: 'root' })
export class ListService {

  constructor(
    private http: HttpClient
  ) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiData}/books`);
  }

  getHouses(): Observable<any> {
    return this.http.get(`${environment.apiData}/houses`);
  }

  getCharacters(): Observable<any> {
    return this.http.get(`${environment.apiData}/characters`);
  }

  getBookById(id: string) {
    return this.http.get(`${environment.apiData}/books/${id}`);
  }

}
