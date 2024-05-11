import { TestBed } from '@angular/core/testing';

import { SecurityInterceptorService } from './security-interceptor.service';

describe('SecurityInterceptorService', () => {
  let service: SecurityInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
