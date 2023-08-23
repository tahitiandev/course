import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateurGroupesPage } from './utilisateur-groupes.page';

describe('UtilisateurGroupesPage', () => {
  let component: UtilisateurGroupesPage;
  let fixture: ComponentFixture<UtilisateurGroupesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UtilisateurGroupesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
