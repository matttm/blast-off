import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarketStreamService} from '../../services/market-stream/market-stream.service';
import {startWith, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit, OnDestroy {
  public ticker$: Observable<any>;
  private tickerId: string;
  public displayedColumns: string[];

  constructor(
    private marketService: MarketStreamService,
    private route: ActivatedRoute
  ) {
    this.displayedColumns = [
      'base',
      'last',
      'open',
      'high',
      'low'
    ];
  }

  ngOnInit(): void {
    const tmp = {};
    const paramMap = this.route.snapshot.paramMap;
    paramMap.keys.forEach(key => {
      tmp[key] = paramMap[key];
    });
    // @ts-ignore
    this.tickerId = tmp.base;
    this.ticker$ = this.marketService.subscribe(this.tickerId).pipe(
      startWith(tmp),
      // tap(console.log)
    );
  }

  ngOnDestroy(): void {
    this.marketService.unsubscribe(this.tickerId);
  }
}
