import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatsPage } from './plats.page';

describe('PlatsPage', () => {
  let component: PlatsPage;
  let fixture: ComponentFixture<PlatsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
