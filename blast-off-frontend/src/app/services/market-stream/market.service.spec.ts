import { TestBed } from '@angular/core/testing';

import { MarketStreamService } from './market-stream.service';

describe('MarketService', () => {
  let service: MarketStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
