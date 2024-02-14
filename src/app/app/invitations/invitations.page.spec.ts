import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitationsPage } from './invitations.page';

describe('InvitationsPage', () => {
  let component: InvitationsPage;
  let fixture: ComponentFixture<InvitationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvitationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
