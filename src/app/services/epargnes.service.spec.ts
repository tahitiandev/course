import { TestBed } from '@angular/core/testing';

import { EpargnesService } from './epargnes.service';

describe('EpargnesService', () => {
  let service: EpargnesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpargnesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
