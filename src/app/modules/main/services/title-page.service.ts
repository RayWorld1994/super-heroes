import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitlePageService {
  titleSubject = new Subject<string>();
  constructor() {}

  get title() {
    return this.titleSubject.asObservable();
  }
}
