import { TestBed } from '@angular/core/testing';

import { DeleteDataService } from './delete-data.service';

describe('DeleteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteDataService = TestBed.get(DeleteDataService);
    expect(service).toBeTruthy();
  });
});
