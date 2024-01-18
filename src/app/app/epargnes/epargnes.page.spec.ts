import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpargnesPage } from './epargnes.page';

describe('EpargnesPage', () => {
  let component: EpargnesPage;
  let fixture: ComponentFixture<EpargnesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EpargnesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
