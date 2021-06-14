const ccxws = require('ccxws');
const config = require('./config');

class Transceiver {
    constructor() {
        this.exchange = new ccxws.Binance();
        this.tickers = {};
        this.intervalId = 9;
    }

    subscribe(subscriber, market) {
        console.log(`subscribing to ${market}`);
        if (process.env.OFFLINE) {
            this.intervalId = this.useMockData(subscriber, market);
        } else {
            this.exchange.on('ticker', ticker => this.forwardTicker(subscriber, ticker));
        }
        if (this.isMarket(market)) {
            this.tickers[market] = market;
            this.exchange.subscribeTicker(market);
        } else {
            console.error('Cannot subscribe wth non-market object');
        }
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

    useMockData(subscriber, market) {
        return setInterval(() => {
            console.log('Sending mock ticker update');
            subscriber.send(JSON.stringify({
                base: market.id,
                open: '',
                last: `${Math.random()}`
            }));
        }, process.env.FREQUENCY || 1000);
    }

    isMarket(market) {
        return market.hasOwnProperty('id') &&
            market.hasOwnProperty('base') &&
            market.hasOwnProperty('quote');
    }
}

module.exports = Transceiver;
