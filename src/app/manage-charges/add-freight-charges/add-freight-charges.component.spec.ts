import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreightChargesComponent } from './add-freight-charges.component';

describe('AddFreightChargesComponent', () => {
  let component: AddFreightChargesComponent;
  let fixture: ComponentFixture<AddFreightChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFreightChargesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFreightChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
