import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThresholdPriceComponent } from './edit-threshold-price.component';

describe('EditThresholdPriceComponent', () => {
  let component: EditThresholdPriceComponent;
  let fixture: ComponentFixture<EditThresholdPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThresholdPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditThresholdPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
