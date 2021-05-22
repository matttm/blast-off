import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  tickerIds: string[];
  constructor() {
    this.tickerIds = [
      'BTC',
      'BTC'
    ];
  }

  ngOnInit(): void {
  }
}
