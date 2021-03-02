import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comic } from '../../core/interfaces/comic/comic.interface';
import { ParametersComicHttp } from '../../core/interfaces/comic/parameterComicHttp.interface';
import { Data } from '../../core/interfaces/data.interface';
import { ComicRequestService } from '../../core/services/comic-request.service';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private comicService: ComicRequestService) {}

  getcomics(paramater?: ParametersComicHttp): Observable<Data<Comic[]>> {
    return this.comicService
      .comicsRequest(paramater)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  comicsAutoComplete(comicTitle: string): Observable<Comic[]> {
    return this.comicService
      .comicsAutoCompleteRequest(comicTitle)
      .pipe(map((apiResponse) => apiResponse.data.results));
  }

  getcomic(id: number): Observable<Data<Comic[]>> {
    return this.comicService
      .comicRequest(id)
      .pipe(map((apiResponse) => apiResponse.data));
  }
}
