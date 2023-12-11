import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionListComponent } from './insertion-list.component';

describe('InsertionListComponent', () => {
  let component: InsertionListComponent;
  let fixture: ComponentFixture<InsertionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
