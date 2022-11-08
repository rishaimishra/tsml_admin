import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgStockAssumptionComponent } from './fg-stock-assumption.component';

describe('FgStockAssumptionComponent', () => {
  let component: FgStockAssumptionComponent;
  let fixture: ComponentFixture<FgStockAssumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FgStockAssumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgStockAssumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
