const ccxws = require('ccxws');
const config = require('./config');

class Transceiver {
    constructor() {
        this.exchange = new ccxws.Binance();
        this.tickers = {};
    }

    subscribe(subscriber, market) {
        console.log(`subscribing to ${market}`);
        this.exchange.on('ticker', ticker => this.forwardTicker(subscriber, ticker));
        this.tickers[market] = market;
        this.exchange.subscribeTicker(market);
    }

    unsubscribe(subscriber, market) {
        console.log(`unsubscribing from ${market}`);
        // const market = this.tickers[market];
        delete this.tickers[market];
        this.exchange.unsubscribeTicker(market);
    }

    publish(publisher, channel, message) {
        this.tickers[channel].message = message;
    }

    forwardTicker(subscriber, ticker) {
        console.log('Sending ticker update');
        subscriber.send(JSON.stringify(ticker));
    }
}

module.exports = Transceiver;
