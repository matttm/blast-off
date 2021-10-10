import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject} from 'rxjs/internal-compatibility';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketStreamService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket(environment.CRYPTO_WS_API);
  }

  get messages$(): Observable<any> {
    return this.socket$.asObservable();
  }

  subscribe(market): Observable<any> {
    console.log(`Subscribing to ${JSON.stringify(market)}`);
    this.socket$.next({
      action: 'SUBSCRIBE',
      market
    });
    return this.messages$;
  }

  unsubscribe(market): void {
    this.socket$.next({
      action: 'UNSUBSCRIBE',
      market
    });
  }
}
