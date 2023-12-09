import { TestBed } from '@angular/core/testing';

import { FishService } from './fish.service';

describe('FishService', () => {
  let service: FishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
