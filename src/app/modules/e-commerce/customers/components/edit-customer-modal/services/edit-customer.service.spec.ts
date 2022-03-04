import { TestBed } from '@angular/core/testing';
import { ExpertInfoService } from './edit-customer.service';

describe('ContactInfoService', () => {
  let service: ExpertInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
