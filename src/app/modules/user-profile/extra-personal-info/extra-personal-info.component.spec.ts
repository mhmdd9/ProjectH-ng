import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPersonalInfoComponent } from './extra-personal-info.component';

describe('ExtraPersonalInfoComponent', () => {
  let component: ExtraPersonalInfoComponent;
  let fixture: ComponentFixture<ExtraPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
