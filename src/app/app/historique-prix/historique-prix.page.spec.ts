import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriquePrixPage } from './historique-prix.page';

describe('HistoriquePrixPage', () => {
  let component: HistoriquePrixPage;
  let fixture: ComponentFixture<HistoriquePrixPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistoriquePrixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
