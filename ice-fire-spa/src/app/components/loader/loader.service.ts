import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderIgnoredUrlPartList: string[] = [];
  public isLoading = new BehaviorSubject(false);
  private startTime: number | null = null;
  private minDisplayDuration = 1000;
  stopLoadingPending: any;

  constructor() { }

  isLoadingIgnoredUrl(url: string) {
    return this.loaderIgnoredUrlPartList.some(part => url.includes(part));
  }

  startLoading() {

    if (!this.startTime) {
      this.startTime = Date.now();
      this.isLoading.next(true);

    }
  }

  stopLoading(requests: any[]) {

    if (requests.length === 0 && this.startTime) {
      const elapsed = Date.now() - this.startTime;
      const remaining = Math.max(this.minDisplayDuration - elapsed, 0);

      setTimeout(() => {
        this.isLoading.next(false);
        this.startTime = null;

      }, remaining);

    }

  }

  setLoaderIgnoredUrlPart(urlPartList: string[]) {
    this.loaderIgnoredUrlPartList.push(...urlPartList);
  }

  setStopLoadingPending() {
    clearTimeout(this.stopLoadingPending);
    this.stopLoadingPending = setTimeout(() => this.isLoading.next(false), 100);
  }

}
