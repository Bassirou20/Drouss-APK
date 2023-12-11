import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceDateComponent } from './presence-date.component';

describe('PresenceDateComponent', () => {
  let component: PresenceDateComponent;
  let fixture: ComponentFixture<PresenceDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresenceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
