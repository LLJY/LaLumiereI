import { TestBed } from '@angular/core/testing';

import { CustomNavigationService } from './custom-navigation.service';

describe('CustomNavigationService', () => {
  let service: CustomNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
