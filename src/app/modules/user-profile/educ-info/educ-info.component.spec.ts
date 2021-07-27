import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducInfoComponent } from './educ-info.component';

describe('EducInfoComponent', () => {
  let component: EducInfoComponent;
  let fixture: ComponentFixture<EducInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
