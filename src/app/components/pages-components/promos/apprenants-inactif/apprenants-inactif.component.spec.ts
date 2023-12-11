import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantsInactifComponent } from './apprenants-inactif.component';

describe('ApprenantsInactifComponent', () => {
  let component: ApprenantsInactifComponent;
  let fixture: ComponentFixture<ApprenantsInactifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantsInactifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantsInactifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
