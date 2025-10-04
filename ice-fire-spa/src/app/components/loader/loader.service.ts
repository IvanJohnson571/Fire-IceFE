import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderIgnoredUrlPartList: any[] = [];
  public isLoading = new BehaviorSubject(false);
  stopLoadingPending: any;

  constructor() { }

  isLoadingIgnoredUrl(url: any) {

    if (this.loaderIgnoredUrlPartList.some(part => url.includes(part))) {
      return true;

    }

    return false;

  }

  startLoading() {
    this.isLoading.next(true);
    console.log('loading');
  }

  stopLoading(requests: any[]) {

    if (requests.length === 0) {
      this.isLoading.next(false);

    }

  }

  setLoaderIgnoredUrlPart(urlPartList: string[]) {
    this.loaderIgnoredUrlPartList.push(...urlPartList);

  }

  setStopLoadingPending() {
    this.stopLoadingPending = setTimeout(() => this.isLoading.next(false), 100);

  }

}
