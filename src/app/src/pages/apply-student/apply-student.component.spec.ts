import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyStudentComponent } from './apply-student.component';

describe('ApplyStudentComponent', () => {
  let component: ApplyStudentComponent;
  let fixture: ComponentFixture<ApplyStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
