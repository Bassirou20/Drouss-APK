import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDisableDialogComponent } from './confirm-disable-dialog.component';

describe('ConfirmDisableDialogComponent', () => {
  let component: ConfirmDisableDialogComponent;
  let fixture: ComponentFixture<ConfirmDisableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDisableDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDisableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
