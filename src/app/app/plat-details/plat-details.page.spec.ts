import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatDetailsPage } from './plat-details.page';

describe('PlatDetailsPage', () => {
  let component: PlatDetailsPage;
  let fixture: ComponentFixture<PlatDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlatDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
