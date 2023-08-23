import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagasinsPage } from './magasins.page';

describe('MagasinsPage', () => {
  let component: MagasinsPage;
  let fixture: ComponentFixture<MagasinsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MagasinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
