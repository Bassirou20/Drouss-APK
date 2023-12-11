import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantDetailComponent } from './apprenant-detail.component';

describe('ApprenantDetailComponent', () => {
  let component: ApprenantDetailComponent;
  let fixture: ComponentFixture<ApprenantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
