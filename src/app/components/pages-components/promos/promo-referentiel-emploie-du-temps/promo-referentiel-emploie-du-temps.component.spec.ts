import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoReferentielEmploieDuTempsComponent } from './promo-referentiel-emploie-du-temps.component';

describe('PromoReferentielEmploieDuTempsComponent', () => {
  let component: PromoReferentielEmploieDuTempsComponent;
  let fixture: ComponentFixture<PromoReferentielEmploieDuTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoReferentielEmploieDuTempsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoReferentielEmploieDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
