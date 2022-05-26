import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceFormComponent } from './race-form.component';

describe('RaceFormComponent', () => {
  let component: RaceFormComponent;
  let fixture: ComponentFixture<RaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
