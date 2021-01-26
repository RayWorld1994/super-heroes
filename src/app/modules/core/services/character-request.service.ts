import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Character } from '../interfaces/character/character.interface';
import { IApiResponse } from '../interfaces/IApiResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterRequestService {
  private _UrlApiCharacters = environment.apiUrl + '/characters';

  constructor(private http: HttpClient) {}

  charactersRequest(): Observable<IApiResponse<Character>> {
    return this.http.get<IApiResponse<Character>>(this._UrlApiCharacters, {});
  }

  MoreCharactersRequest(offset: number): Observable<IApiResponse<Character>> {
    const options = offset
      ? { params: new HttpParams().set('offset', offset.toString()) }
      : {};

    return this.http.get<IApiResponse<Character>>(
      this._UrlApiCharacters,
      options
    );
  }

  characterRequest(id: number): Observable<IApiResponse<Character>> {
    return this.http.get<IApiResponse<Character>>(
      `${this._UrlApiCharacters}/${id}`
    );
  }
}
