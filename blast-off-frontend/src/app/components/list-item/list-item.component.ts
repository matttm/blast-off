import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MarketService} from '../../services/market/market.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit, OnDestroy {

  @Input()
  tickerId: string;
  ticker$: any;

  constructor(private marketService: MarketService) { }

  ngOnInit(): void {
    this.ticker$ = this.marketService.subscribe(this.tickerId);
    this.ticker$.subscribe(
      msg => console.log('message received: ' + JSON.stringify(msg)),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
    );
  }

  ngOnDestroy(): void {
    this.marketService.unsubscribe(this.tickerId);
  }
}
