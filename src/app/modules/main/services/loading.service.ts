import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new Subject<boolean>();
  constructor() {}

  get isLoading() {
    return this._loading.asObservable();
  }

  onLoading(){
    this._loading.next(true);
  }

  offLoading(){
    this._loading.next(false);
  }
}
