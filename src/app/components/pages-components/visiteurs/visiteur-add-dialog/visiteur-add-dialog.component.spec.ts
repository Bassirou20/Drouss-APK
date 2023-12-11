import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurAddDialogComponent } from './visiteur-add-dialog.component';

describe('VisiteurAddDialogComponent', () => {
  let component: VisiteurAddDialogComponent;
  let fixture: ComponentFixture<VisiteurAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisiteurAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
