import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecInfoComponent } from './spec-info.component';

describe('SpecInfoComponent', () => {
  let component: SpecInfoComponent;
  let fixture: ComponentFixture<SpecInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
