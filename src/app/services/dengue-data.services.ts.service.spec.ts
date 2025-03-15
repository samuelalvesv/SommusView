import { TestBed } from '@angular/core/testing';

import { DengueDataService } from './dengue-data.services.ts.service';

describe('DengueDataService', () => {
  let service: DengueDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DengueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
