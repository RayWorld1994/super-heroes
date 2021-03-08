import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Character } from '../interfaces/character/character.interface';
import { IApiResponse } from '../interfaces/IApiResponse.interface';
import { ParametersHttp } from '../interfaces/parametersHttp.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterRequestService {
  private _UrlApiCharacters = environment.apiUrl + '/characters';

  constructor(private http: HttpClient) {}

  charactersRequest(
    parameters?: ParametersHttp
  ): Observable<IApiResponse<Character[]>> {
    const params = parameters
      ? Object.entries(parameters).reduce(
          (accu, [key, value]) => (value ? { ...accu, [key]: value } : accu),
          {}
        )
      : {};
    const options = { params };
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
}
