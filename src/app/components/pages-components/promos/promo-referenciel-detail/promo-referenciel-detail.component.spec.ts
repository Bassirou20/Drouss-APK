import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoReferencielDetailComponent } from './promo-referenciel-detail.component';

describe('PromoReferencielDetailComponent', () => {
  let component: PromoReferencielDetailComponent;
  let fixture: ComponentFixture<PromoReferencielDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoReferencielDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoReferencielDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
