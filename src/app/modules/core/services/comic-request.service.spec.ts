import { TestBed } from '@angular/core/testing';

import { ComicRequestService } from './comic-request.service';

describe('ComicRequestService', () => {
  let service: ComicRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
