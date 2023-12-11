import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurDetailComponent } from './visiteur-detail.component';

describe('VisiteurDetailComponent', () => {
  let component: VisiteurDetailComponent;
  let fixture: ComponentFixture<VisiteurDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisiteurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
