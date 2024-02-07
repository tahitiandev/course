import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AffecteUtilisateurGroupeComponent } from './affecte-utilisateur-groupe.component';

describe('AffecteUtilisateurGroupeComponent', () => {
  let component: AffecteUtilisateurGroupeComponent;
  let fixture: ComponentFixture<AffecteUtilisateurGroupeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecteUtilisateurGroupeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AffecteUtilisateurGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
