import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MarketService} from '../../services/market/market.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit, OnDestroy {

  @Input()
  tickerId: string;
  ticker$: any;
  displayedColumns: string[];

  constructor(
    private marketService: MarketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayedColumns = [
      'base',
      'last',
      'open',
      'high',
      'low'
    ];
    this.ticker$ = this.marketService.subscribe(this.tickerId);
    // this.ticker$.subscribe(
    //   msg => console.log('message received: ' + JSON.stringify(msg)),
    //   // Called whenever there is a message from the server
    //   err => console.log(err),
    //   // Called if WebSocket API signals some kind of error
    //   () => console.log('complete')
    //   // Called when connection is closed (for whatever reason)
    // );
  }

  onButtonClick(ticker): void {
    this.router.navigate([
      `market`,
      this.tickerId
    ], ticker).then(r => console.log('navigating to asset'));
  }
  ngOnDestroy(): void {
    this.marketService.unsubscribe(this.tickerId);
  }
}