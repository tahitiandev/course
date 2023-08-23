import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamillesPage } from './familles.page';

describe('FamillesPage', () => {
  let component: FamillesPage;
  let fixture: ComponentFixture<FamillesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FamillesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
