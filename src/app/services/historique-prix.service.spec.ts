import { TestBed } from '@angular/core/testing';

import { HistoriquePrixService } from './historique-prix.service';

describe('HistoriquePrixService', () => {
  let service: HistoriquePrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriquePrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
