import { Comic } from './../interfaces/comic/comic.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../interfaces/IApiResponse.interface';
import { Observable } from 'rxjs';
import { ParametersHttp } from '../interfaces/parametersHttp.interface';

@Injectable({
  providedIn: 'root',
})
export class ComicRequestService {
  private _UrlApiComics = environment.apiUrl + '/comics';

  constructor(private http: HttpClient) {}

  comicsRequest(
    parameters?: ParametersHttp
  ): Observable<IApiResponse<Comic[]>> {
    const params = parameters
      ? Object.entries(parameters).reduce(
          (accu, [key, value]) => (value ? { ...accu, [key]: value } : accu),
          {}
        )
      : {};
    const options = { params };
    return this.http.get<IApiResponse<Comic[]>>(this._UrlApiComics, options);
  }

  comicsAutoCompleteRequest(
    titleComic: string
  ): Observable<IApiResponse<Comic[]>> {
    const options = { params: { titleStartsWith: titleComic, limit: '5' } };
    return this.http.get<IApiResponse<Comic[]>>(this._UrlApiComics, options);
  }

  comicRequest(id: number): Observable<IApiResponse<Comic[]>> {
    return this.http.get<IApiResponse<Comic[]>>(`${this._UrlApiComics}/${id}`);
  }
}
