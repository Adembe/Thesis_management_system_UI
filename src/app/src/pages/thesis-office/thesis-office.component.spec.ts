import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisOfficeComponent } from './thesis-office.component';

describe('ThesisOfficeComponent', () => {
  let component: ThesisOfficeComponent;
  let fixture: ComponentFixture<ThesisOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThesisOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
