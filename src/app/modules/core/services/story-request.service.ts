import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../interfaces/IApiResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class StoryRequestService {
  private _UrlApiStories = environment.apiUrl + '/stories';

  constructor() {}
}
