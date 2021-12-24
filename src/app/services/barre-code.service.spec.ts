import { TestBed } from '@angular/core/testing';

import { BarreCodeService } from './barre-code.service';

describe('BarreCodeService', () => {
  let service: BarreCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarreCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
