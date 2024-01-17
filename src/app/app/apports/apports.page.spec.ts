import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApportsPage } from './apports.page';

describe('ApportsPage', () => {
  let component: ApportsPage;
  let fixture: ComponentFixture<ApportsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
