import { TestBed } from '@angular/core/testing';

import { StoryRequestService } from './story-request.service';

describe('StoryRequestService', () => {
  let service: StoryRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
