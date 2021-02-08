import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comic } from '../../core/interfaces/comic/comic.interface';
import { Data } from '../../core/interfaces/data.interface';
import { ComicRequestService } from '../../core/services/comic-request.service';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private comicService: ComicRequestService) {}

  getcomics(order: string): Observable<Data<Comic[]>> {
    return this.comicService
      .comicsRequest(order)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  getcomic(id: number): Observable<Data<Comic[]>> {
    return this.comicService
      .comicRequest(id)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  getMorecomics(offset: number, order: string): Observable<Data<Comic[]>> {
    return this.comicService
      .MoreComicsRequest(offset, order)
      .pipe(map((apiResponse) => apiResponse.data));
  }
}
