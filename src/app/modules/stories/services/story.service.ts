import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data } from '../../core/interfaces/data.interface';
import { ParametersHttp } from '../../core/interfaces/parametersHttp.interface';
import { Story } from '../../core/interfaces/story/story.interface';
import { StoryRequestService } from '../../core/services/story-request.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private storyService: StoryRequestService) {}

  getstories(paramater?: ParametersHttp): Observable<Data<Story[]>> {
    return this.storyService
      .storiesRequest(paramater)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  getstory(id: number): Observable<Data<Story[]>> {
    return this.storyService
      .storyRequest(id)
      .pipe(map((apiResponse) => apiResponse.data));
  }
}
