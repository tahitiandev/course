import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoPage } from './memo.page';

describe('MemoPage', () => {
  let component: MemoPage;
  let fixture: ComponentFixture<MemoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
