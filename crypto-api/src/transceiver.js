class Transceiver {
    constructor() {
        this.tickers = {};
        this.brokerId = setInterval(() => { this.broker() }, 1000);
    }
    
    subscribe(subscriber, ticker) {
        console.log(`subscribing to ${ticker}`);
        this.tickers[ticker].subscribers.push(subscriber);
    }
    unsubscribe(subscriber, ticker) {
        console.log(`unsubscribing from ${ticker}`);
        this.tickers[ticker].subscribers.push(subscriber);
    }

    removeBroker() {
        clearInterval(this.brokerId);
    }

    publish(publisher, channel, message) {
        this.tickers[channel].message = message;
    }

    broker() {
        for (const channel in this.tickers) {
            if (this.tickers.hasOwnProperty(channel)) {
                const channelObj = this.tickers[channel];
                if (channelObj.message) {
                    console.log(`found message: ${channelObj.message} in ${channel}`);

                    channelObj.subscribers.forEach(subscriber => {
                        subscriber.send(JSON.stringify({
                            message: channelObj.message
                        }));
                    });

                    channelObj.message = '';
                }
            }
        }
    }
}
module.exports = Transceiver;
