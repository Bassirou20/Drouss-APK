import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentielCardComponent } from './referentiel-card.component';

describe('ReferentielCardComponent', () => {
  let component: ReferentielCardComponent;
  let fixture: ComponentFixture<ReferentielCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferentielCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferentielCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
