import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionDetailComponent } from './insertion-detail.component';

describe('InsertionDetailComponent', () => {
  let component: InsertionDetailComponent;
  let fixture: ComponentFixture<InsertionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
