import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MarketService} from "../../services/market/market.service";
import {startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit, OnDestroy {
  private ticker$: Observable<any>;
  private tickerId: string;

  constructor(
    private marketService: MarketService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const tmp = {};
    const paramMap = this.route.snapshot.paramMap;
    paramMap.keys.forEach(key => {
      tmp[key] = paramMap[key];
    });
    this.tickerId = tmp.base;
    this.ticker$ = this.marketService.subscribe(this.tickerId).pipe(
      startWith(tmp)
    );
  }

  ngOnDestroy(): void {
    this.marketService.unsubscribe(this.tickerId);
  }
}
