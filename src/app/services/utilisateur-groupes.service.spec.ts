import { TestBed } from '@angular/core/testing';

import { UtilisateurGroupesService } from './utilisateur-groupes.service';

describe('UtilisateurGroupesService', () => {
  let service: UtilisateurGroupesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurGroupesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
