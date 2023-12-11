import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentielAddDialogComponent } from './referentiel-add-dialog.component';

describe('ReferentielAddDialogComponent', () => {
  let component: ReferentielAddDialogComponent;
  let fixture: ComponentFixture<ReferentielAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferentielAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferentielAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
