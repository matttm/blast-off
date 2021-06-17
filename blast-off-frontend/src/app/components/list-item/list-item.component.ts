import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MarketStreamService} from '../../services/market-stream/market-stream.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr[app-list-item]',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit, OnDestroy {

  @Input()
  tickerData: string;
  ticker$: any;
  displayedColumns: string[];

  constructor(
    private marketService: MarketStreamService,
    private router: Router
  ) { }

  // get marketCap(): string {
  //   return '1 T';
  // }

  ngOnInit(): void {
    // @ts-ignore
    this.ticker$ = this.marketService.subscribe(this.tickerData.market);
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
    // this.router.navigate([
    //   `assets`,
    //   this.tickerId
    // ], {...ticker}).then(r => console.log('navigating to asset'));
  }
  ngOnDestroy(): void {
    // @ts-ignore
    this.marketService.unsubscribe(this.tickerData.market);
  }
}
