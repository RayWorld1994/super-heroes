import { Comic } from './../interfaces/comic/comic.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../interfaces/IApiResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicRequestService {
  private _UrlApiComics = environment.apiUrl + '/comics';

  constructor(private http: HttpClient) {}

  comicsRequest(orderBy: string): Observable<IApiResponse<Comic[]>> {
    const options = { params: { orderBy } };
    return this.http.get<IApiResponse<Comic[]>>(this._UrlApiComics, options);
  }

  comicsAutoCompleteRequest(
    titleComic: string
  ): Observable<IApiResponse<Comic[]>> {
    const options = { params: { titleStartsWith: titleComic, limit: '5' } };
    return this.http.get<IApiResponse<Comic[]>>(this._UrlApiComics, options);
  }

  MoreComicsRequest(
    offset: number,
    orderBy: string
  ): Observable<IApiResponse<Comic[]>> {
    const options = { params: { offset: offset.toString(), orderBy } };
    return this.http.get<IApiResponse<Comic[]>>(this._UrlApiComics, options);
  }

  comicRequest(id: number): Observable<IApiResponse<Comic[]>> {
    return this.http.get<IApiResponse<Comic[]>>(`${this._UrlApiComics}/${id}`);
  }
}
