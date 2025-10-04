import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};


declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  private baseUrl = './'

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { };

  public sendPostRequestPlus(data) {
    return this.http.post(
      environment.baseUrl + "api/" + data.path + this.parseQueryString(data.params),
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'json',
        withCredentials: true
      }
    );
  };

  public sendPost(data) {

    return this.http.post(
      environment.baseUrl + "api/" + data.path + this.parseQueryString(data.params),
      data.body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'json',
        observe: 'response',
        withCredentials: false
      }
    );

  };


  public sendGetRequestPlus(data) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });

    if (!environment.production) {
      headers = null;
    }

    return this.http.get(environment.baseUrl + "api/" + data.path + this.parseQueryString(data.params),
      {
        headers: headers,
        observe: 'response',
        withCredentials: true
      });

  }

  public sendGetRequest(data) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });

    if (!environment.production) {
      headers = null;
    }

    return this.http.get(environment.baseUrl + "api/" + data.path + this.parseQueryString(data.params), {
      headers: headers,
      withCredentials: true
    }).pipe(catchError((response: HttpErrorResponse) => {
      this.showError(response);
      return EMPTY;
    }));

  }

  get<T>(url: string, queryParams = {}, ignoreToken = false): Observable<T> {
    let options = httpOptions;

    if (ignoreToken) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Ignore-New-Token': 'true',
        }),
        withCredentials: true
      };
    }
    return this.http.get<T>(environment.baseUrl + "api/" + url + this.parseQueryString(queryParams), options)
      .pipe(catchError((response: HttpErrorResponse) => {
        this.showError(response);
        return throwError(response.error);
      }));

  }

  post<T>(url: string, model: any, customOptions: any = null): Observable<T> {
    let options = httpOptions;
    if (customOptions) {
      options = customOptions;
    }

    let data = this.getData(options.headers, model);
    return this.http.post<T>(environment.baseUrl + "api/" + url, data, options)
      .pipe(catchError((response: HttpErrorResponse, model) => {
        this.showError(response);
        return throwError(response.error);
      }));
  }

  put<T>(url: string, model: any, customOptions: any = null): Observable<T> {
    let options = httpOptions;
    if (customOptions) {
      options = customOptions;
    }

    const data = this.getData(options.headers, model);

    return this.http.put<T>(environment.baseUrl + "api/" + url, data, options)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.showError(response);
          return throwError(response.error);
        })
      );
  }


  private getData(headers: HttpHeaders, data: any) {
    if (headers.get('Content-Type').toLowerCase() == 'application/json') {
      return this.getJson(data);
    } else if (headers.get('Content-Type').toLowerCase() == 'application/x-www-form-urlencoded') {
      return this.getFormData(data);
    } else {
      return this.getJson(data);
    }
  }

  private parseQueryString(model) {
    let qsParams = [];
    for (let prop in model) {
      if (model[prop] != null && model[prop] != undefined) {
        if (model[prop] instanceof Date)
          model[prop] = model[prop].toISOString()

        qsParams.push(prop + '=' + model[prop]);
      }
    }
    if (qsParams.length)
      return '?' + qsParams.join('&');

    return '';
  }

  private getFormData(data) {
    return $.param(data);
  }

  private getJson(data) {
    return JSON.stringify(data);
  }
  showError(response) {

    if (response.status == 401) {
      window.location.href = '/login';
      return;

    }

  }

  sendPostFormData(path: string, formData: FormData) {
    const url = `${environment.baseUrl}${path}`;
    return this.http.post(url, formData);
  }

}
