import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPromoDisableDialogComponent } from './confirm-promo-disable-dialog.component';

describe('ConfirmPromoDisableDialogComponent', () => {
  let component: ConfirmPromoDisableDialogComponent;
  let fixture: ComponentFixture<ConfirmPromoDisableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPromoDisableDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPromoDisableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
