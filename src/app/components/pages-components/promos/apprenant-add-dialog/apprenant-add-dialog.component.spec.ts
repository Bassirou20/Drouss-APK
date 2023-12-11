import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantAddDialogComponent } from './apprenant-add-dialog.component';

describe('ApprenantAddDialogComponent', () => {
  let component: ApprenantAddDialogComponent;
  let fixture: ComponentFixture<ApprenantAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
