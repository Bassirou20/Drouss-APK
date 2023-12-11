import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordCircleComponent } from './dashbord-circle.component';

describe('DashbordCircleComponent', () => {
  let component: DashbordCircleComponent;
  let fixture: ComponentFixture<DashbordCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
