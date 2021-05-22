import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject} from 'rxjs/internal-compatibility';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket(environment.CRYPTO_API);
  }

  get messages$(): Observable<any> {
    return this.socket$.asObservable();
  }

  subscribe(ticker): Observable<any> {
    this.socket$.next({
      action: 'SUBSCRIBE',
      ticker
    });
    return this.messages$;
  }

  unsubscribe(ticker): void {
    this.socket$.next({
      action: 'UNSUBSCRIBE',
      ticker
    });
  }
}
