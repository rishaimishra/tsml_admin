import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecurityQuestionComponent } from './edit-security-question.component';

describe('EditSecurityQuestionComponent', () => {
  let component: EditSecurityQuestionComponent;
  let fixture: ComponentFixture<EditSecurityQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSecurityQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
