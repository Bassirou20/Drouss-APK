import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordCircleItemComponent } from './dashbord-circle-item.component';

describe('DashbordCircleItemComponent', () => {
  let component: DashbordCircleItemComponent;
  let fixture: ComponentFixture<DashbordCircleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordCircleItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordCircleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
