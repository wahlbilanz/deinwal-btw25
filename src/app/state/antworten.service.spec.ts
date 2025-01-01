import { TestBed } from '@angular/core/testing';

import { AntwortenService } from './antworten.service';

describe('AntwortenService', () => {
  let service: AntwortenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntwortenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
