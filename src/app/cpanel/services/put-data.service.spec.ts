import { TestBed } from '@angular/core/testing';

import { PutDataService } from './put-data.service';

describe('PutDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PutDataService = TestBed.get(PutDataService);
    expect(service).toBeTruthy();
  });
});
