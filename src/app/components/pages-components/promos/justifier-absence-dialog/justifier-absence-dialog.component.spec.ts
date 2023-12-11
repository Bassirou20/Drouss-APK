import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustifierAbsenceDialogComponent } from './justifier-absence-dialog.component';

describe('JustifierAbsenceDialogComponent', () => {
  let component: JustifierAbsenceDialogComponent;
  let fixture: ComponentFixture<JustifierAbsenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustifierAbsenceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustifierAbsenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
