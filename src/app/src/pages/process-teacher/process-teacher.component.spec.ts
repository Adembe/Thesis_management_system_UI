import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTeacherComponent } from './process-teacher.component';

describe('ProcessTeacherComponent', () => {
  let component: ProcessTeacherComponent;
  let fixture: ComponentFixture<ProcessTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
