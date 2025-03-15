import { TestBed } from '@angular/core/testing';

import { DengueDataServicesTsService } from './dengue-data.services.ts.service';

describe('DengueDataServicesTsService', () => {
  let service: DengueDataServicesTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DengueDataServicesTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
