import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoreferentielRemoveDialogComponent } from './promoreferentiel-remove-dialog.component';

describe('PromoreferentielRemoveDialogComponent', () => {
  let component: PromoreferentielRemoveDialogComponent;
  let fixture: ComponentFixture<PromoreferentielRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoreferentielRemoveDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoreferentielRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
