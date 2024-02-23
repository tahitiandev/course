import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuSemaineRecherchePlatComponent } from './menu-semaine-recherche-plat.component';

describe('MenuSemaineRecherchePlatComponent', () => {
  let component: MenuSemaineRecherchePlatComponent;
  let fixture: ComponentFixture<MenuSemaineRecherchePlatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSemaineRecherchePlatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSemaineRecherchePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
