import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSectorComponent } from './info-sector.component';

describe('InfoSectorComponent', () => {
  let component: InfoSectorComponent;
  let fixture: ComponentFixture<InfoSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
