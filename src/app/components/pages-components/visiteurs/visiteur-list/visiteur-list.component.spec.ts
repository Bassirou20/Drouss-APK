import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurListComponent } from './visiteur-list.component';

describe('VisiteurListComponent', () => {
  let component: VisiteurListComponent;
  let fixture: ComponentFixture<VisiteurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisiteurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
