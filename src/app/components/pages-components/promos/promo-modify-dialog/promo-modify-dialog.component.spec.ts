import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoModifyDialogComponent } from './promo-modify-dialog.component';

describe('PromoModifyDialogComponent', () => {
  let component: PromoModifyDialogComponent;
  let fixture: ComponentFixture<PromoModifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoModifyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
