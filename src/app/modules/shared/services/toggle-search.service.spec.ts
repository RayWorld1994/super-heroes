import { TestBed } from '@angular/core/testing';

import { ToggleSearchService } from './toggle-search.service';

describe('ToggleSearchService', () => {
  let service: ToggleSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
