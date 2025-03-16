import { TestBed } from '@angular/core/testing';

import { DengueDataStateService } from './dengue-data-state.service';

describe('DengueDataStateService', () => {
  let service: DengueDataStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DengueDataStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
