import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametersHttp } from '../interfaces/comic/parameterHttp.interface';
import { IApiResponse } from '../interfaces/IApiResponse.interface';
import { Story } from '../interfaces/story/story.interface';

@Injectable({
  providedIn: 'root',
})
export class StoryRequestService {
  private _UrlApiStories = environment.apiUrl + '/stories';

  constructor(private http: HttpClient) {}

  storiesRequest(
    parameters?: ParametersHttp
  ): Observable<IApiResponse<Story[]>> {
    const params = parameters
      ? Object.entries(parameters).reduce(
          (accu, [key, value]) => (value ? { ...accu, [key]: value } : accu),
          {}
        )
      : {};
    const options = { params };
    return this.http.get<IApiResponse<Story[]>>(this._UrlApiStories, options);
  }

  // storiesAutoCompleteRequest(
  //   titleStory: string
  // ): Observable<IApiResponse<Story[]>> {
  //   const options = { params: { titleStartsWith: titleStory, limit: '5' } };
  //   return this.http.get<IApiResponse<Story[]>>(this._UrlApiStories, options);
  // }

  storyRequest(id: number): Observable<IApiResponse<Story[]>> {
    return this.http.get<IApiResponse<Story[]>>(`${this._UrlApiStories}/${id}`);
  }
}
