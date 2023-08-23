import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateursPage } from './utilisateurs.page';

describe('UtilisateursPage', () => {
  let component: UtilisateursPage;
  let fixture: ComponentFixture<UtilisateursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UtilisateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
