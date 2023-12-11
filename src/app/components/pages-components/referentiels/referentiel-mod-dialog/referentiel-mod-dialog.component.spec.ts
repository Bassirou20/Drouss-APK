import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentielModDialogComponent } from './referentiel-mod-dialog.component';

describe('ReferentielModDialogComponent', () => {
  let component: ReferentielModDialogComponent;
  let fixture: ComponentFixture<ReferentielModDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferentielModDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferentielModDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
