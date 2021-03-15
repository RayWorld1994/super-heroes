import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comic } from '../../core/interfaces/comic/comic.interface';
import { Data } from '../../core/interfaces/data.interface';
import { ParametersHttp } from '../../core/interfaces/parametersHttp.interface';
import { ComicRequestService } from '../../core/services/comic-request.service';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private comicService: ComicRequestService) {}

  getcomics(paramater?: ParametersHttp): Observable<Data<Comic[]>> {
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
