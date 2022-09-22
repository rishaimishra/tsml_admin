import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetThresholdLimitsComponent } from './set-threshold-limits.component';

describe('SetThresholdLimitsComponent', () => {
  let component: SetThresholdLimitsComponent;
  let fixture: ComponentFixture<SetThresholdLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetThresholdLimitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetThresholdLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
