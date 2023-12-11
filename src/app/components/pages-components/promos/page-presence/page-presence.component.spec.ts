import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePresenceComponent } from './page-presence.component';

describe('PagePresenceComponent', () => {
  let component: PagePresenceComponent;
  let fixture: ComponentFixture<PagePresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
