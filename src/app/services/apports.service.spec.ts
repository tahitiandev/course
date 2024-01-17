import { TestBed } from '@angular/core/testing';

import { ApportsService } from './apports.service';

describe('ApportsService', () => {
  let service: ApportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
