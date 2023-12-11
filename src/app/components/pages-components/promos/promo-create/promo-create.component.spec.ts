import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCreateComponent } from './promo-create.component';

describe('PromoCreateComponent', () => {
  let component: PromoCreateComponent;
  let fixture: ComponentFixture<PromoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
