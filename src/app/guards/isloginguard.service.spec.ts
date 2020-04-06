import { TestBed } from '@angular/core/testing';

import { IsloginguardService } from './isloginguard.service';

describe('IsloginguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsloginguardService = TestBed.get(IsloginguardService);
    expect(service).toBeTruthy();
  });
});
