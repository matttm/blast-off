import { Component, OnInit } from '@angular/core';
import {MarketService} from '../../services/market/market.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  tickers$: Observable<any[]>;
  tableCols: string[];
  constructor(private  marketService: MarketService) {
    this.tickers$ = marketService.getMarketMetaData()
      .pipe(
        tap(console.log),
        map(marketData => marketData.tickers)
      );
    this.tableCols = [
      'Name',
      'Price'
    ];
  }

  ngOnInit(): void {
  }
}
