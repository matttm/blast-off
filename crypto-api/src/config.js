
module.exports = {
    tickers: {
        BTC: {
            name: 'Bitcoin',
            market: {
                id: "BTCUSDT", // remote_id used by the exchange
                base: "BTC", // standardized base symbol for Bitcoin
                quote: "USDT", // standardized quote symbol for Tether
            },
            circulatingSupply: '18,718,775'
        },
        ETH: {
            name: 'Ethereum',
            market: {
                id: "ETHUSDT",
                base: "ETH",
                quote: "USDT"
            },
            circulatingSupply: '116,000,000'
        },
        ADA: {
            name: 'Cardano',
            market: {
                id: "ADAUSDT",
                base: "ADA",
                quote: "USDT"
            },
            circulatingSupply: '31,948,309,440.747799'
        }
    }
}
