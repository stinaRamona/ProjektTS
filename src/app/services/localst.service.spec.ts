import { TestBed } from '@angular/core/testing';

import { LocalstService } from './localst.service';

describe('LocalstService', () => {
  let service: LocalstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
