import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmploieDuTempsComponent } from './add-emploie-du-temps.component';

describe('AddEmploieDuTempsComponent', () => {
  let component: AddEmploieDuTempsComponent;
  let fixture: ComponentFixture<AddEmploieDuTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmploieDuTempsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmploieDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
