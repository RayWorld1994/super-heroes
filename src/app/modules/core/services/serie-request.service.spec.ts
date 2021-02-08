import { TestBed } from '@angular/core/testing';

import { SerieRequestService } from './serie-request.service';

describe('SerieRequestService', () => {
  let service: SerieRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
