import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleSearchService {
  private clickSubject = new Subject<void>();

  constructor() {}

  click() {
    this.clickSubject.next();
  }

  get clickSub(): Observable<void> {
    return this.clickSubject.asObservable();
  }
}
