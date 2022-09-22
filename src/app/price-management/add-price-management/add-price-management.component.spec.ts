import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceManagementComponent } from './add-price-management.component';

describe('AddPriceManagementComponent', () => {
  let component: AddPriceManagementComponent;
  let fixture: ComponentFixture<AddPriceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPriceManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
