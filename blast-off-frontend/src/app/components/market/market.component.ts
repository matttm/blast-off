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
        map(marketData => {
          // example of marketData before mapping
          //
          // {
          //   BTC: {
          //     name: 'Bitcoin',
          //       market: {
          //       id: "BTCUSDT", // remote_id used by the exchange
          //         base: "BTC", // standardized base symbol for Bitcoin
          //         quote: "USDT", // standardized quote symbol for Tether
          //     },
          //     circulatingSupply: '18,718,775'
          //   },
          //   ...
          // }
          // mapped to
          //
          // [{
          //     name: 'Bitcoin',
          //       market: {
          //       id: "BTCUSDT", // remote_id used by the exchange
          //         base: "BTC", // standardized base symbol for Bitcoin
          //         quote: "USDT", // standardized quote symbol for Tether
          //     },
          //     circulatingSupply: '18,718,775'
          // },
          // ...
          // ]
          const tickers = [];
          const tickersObj = marketData?.tickers;
          for (const key in tickersObj) {
            if (tickersObj.hasOwnProperty(key)) {
              tickers.push(tickersObj[key]);
            }
          }
          return tickers;
        }),
        tap(console.log)
      );
    this.tableCols = [
      'Name',
      'Price'
    ];
  }

  ngOnInit(): void {
  }
}
