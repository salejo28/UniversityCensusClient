import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSpeciesComponent } from './form-species.component';

describe('FormSpeciesComponent', () => {
  let component: FormSpeciesComponent;
  let fixture: ComponentFixture<FormSpeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSpeciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
