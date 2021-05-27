const ccxws = require('ccxws');
const config = require('./config');

class Transceiver {
    constructor() {
        this.exchange = new ccxws.Binance();
        this.tickers = {};
    }

    subscribe(subscriber, ticker) {
        console.log(`subscribing to ${ticker}`);
        this.exchange.on('ticker', ticker => this.forwardTicker(subscriber, ticker));
        //TODO: get market from ticker
        const market = config.tickers[ticker]?.market;
        this.tickers[ticker] = market;
        this.exchange.subscribeTicker(market);
    }

    unsubscribe(subscriber, ticker) {
        console.log(`unsubscribing from ${ticker}`);
        const market = this.tickers[ticker];
        delete this.tickers[ticker];
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
