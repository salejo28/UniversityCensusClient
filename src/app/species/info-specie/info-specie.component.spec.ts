import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSpecieComponent } from './info-specie.component';

describe('InfoSpecieComponent', () => {
  let component: InfoSpecieComponent;
  let fixture: ComponentFixture<InfoSpecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSpecieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSpecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
