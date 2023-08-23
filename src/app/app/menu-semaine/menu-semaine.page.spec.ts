import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuSemainePage } from './menu-semaine.page';

describe('MenuSemainePage', () => {
  let component: MenuSemainePage;
  let fixture: ComponentFixture<MenuSemainePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuSemainePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
