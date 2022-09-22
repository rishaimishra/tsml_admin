import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightChargesComponent } from './freight-charges.component';

describe('FreightChargesComponent', () => {
  let component: FreightChargesComponent;
  let fixture: ComponentFixture<FreightChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightChargesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
