import { TestBed } from '@angular/core/testing';

import { CharacterRequestService } from './character-request.service';

describe('CharacterRequestService', () => {
  let service: CharacterRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
