import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionCardComponent } from './insertion-card.component';

describe('InsertionCardComponent', () => {
  let component: InsertionCardComponent;
  let fixture: ComponentFixture<InsertionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
