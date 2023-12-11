import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantResetDialogComponent } from './apprenant-reset-dialog.component';

describe('ApprenantResetDialogComponent', () => {
  let component: ApprenantResetDialogComponent;
  let fixture: ComponentFixture<ApprenantResetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantResetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
