import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantsAbsencesComponent } from './apprenants-absences.component';

describe('ApprenantsAbsencesComponent', () => {
  let component: ApprenantsAbsencesComponent;
  let fixture: ComponentFixture<ApprenantsAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantsAbsencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantsAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
