import { TestBed } from '@angular/core/testing';

import { CreatorRequestService } from './creator-request.service';

describe('CreatorRequestService', () => {
  let service: CreatorRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatorRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
