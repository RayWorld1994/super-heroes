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

  charactersRequest(order: string): Observable<IApiResponse<Character[]>> {
    const option = { params: { orderBy: order } };
    return this.http.get<IApiResponse<Character[]>>(
      this._UrlApiCharacters,
      option
    );
  }

  MoreCharactersRequest(
    offset: number,
    order: string
  ): Observable<IApiResponse<Character[]>> {
    const options = { params: { offset: offset.toString(), orderBy: order } };
    return this.http.get<IApiResponse<Character[]>>(
      this._UrlApiCharacters,
      options
    );
  }

  characterRequest(id: number): Observable<IApiResponse<Character[]>> {
    return this.http.get<IApiResponse<Character[]>>(
      `${this._UrlApiCharacters}/${id}`
    );
  }

  filterCharacterByNameRequest(byName: string) {
    const option = { params: { nameStartsWith: byName } };
    return this.http.get<IApiResponse<Character[]>>(
      this._UrlApiCharacters,
      option
    );
  }
}
