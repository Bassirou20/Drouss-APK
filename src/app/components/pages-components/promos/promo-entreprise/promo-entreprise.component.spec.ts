import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoEntrepriseComponent } from './promo-entreprise.component';

describe('PromoEntrepriseComponent', () => {
  let component: PromoEntrepriseComponent;
  let fixture: ComponentFixture<PromoEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
