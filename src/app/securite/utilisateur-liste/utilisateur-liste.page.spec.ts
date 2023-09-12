import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateurListePage } from './utilisateur-liste.page';

describe('UtilisateurListePage', () => {
  let component: UtilisateurListePage;
  let fixture: ComponentFixture<UtilisateurListePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UtilisateurListePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
