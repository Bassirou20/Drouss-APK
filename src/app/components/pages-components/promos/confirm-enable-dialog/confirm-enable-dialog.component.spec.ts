import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEnableDialogComponent } from './confirm-enable-dialog.component';

describe('ConfirmEnableDialogComponent', () => {
  let component: ConfirmEnableDialogComponent;
  let fixture: ComponentFixture<ConfirmEnableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEnableDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEnableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
