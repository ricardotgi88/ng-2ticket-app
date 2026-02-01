import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasDataGuard } from './has-data-guard';

describe('hasDataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
