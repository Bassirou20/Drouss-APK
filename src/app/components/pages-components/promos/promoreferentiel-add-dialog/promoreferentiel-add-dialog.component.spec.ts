import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoreferentielAddDialogComponent } from './promoreferentiel-add-dialog.component';

describe('PromoreferentielAddDialogComponent', () => {
  let component: PromoreferentielAddDialogComponent;
  let fixture: ComponentFixture<PromoreferentielAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoreferentielAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoreferentielAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
