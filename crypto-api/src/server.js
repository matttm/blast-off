const ws = require('ws');
const Transceiver = require('./transceiver');
const WebSocketServer = ws.Server;

const port = process.env.WS_PORT || 3232;
const wss = new WebSocketServer({ port });
const transceiver = new Transceiver();

wss.on('connection', (ws, req) => {
    console.log(`Connection request from: ${req.connection.remoteAddress}`);
    ws.on('message', (data) => {
        console.log('data: ', data);
        const json = JSON.parse(data);
        const action = json.action;
        const ticker = json.ticker;

        switch (action) {
            case 'SUBSCRIBE':
                transceiver.subscribe(ws, ticker);
                break;
            case 'UNSUBSCRIBE':
                transceiver.unsubscribe(ws, ticker);
                break;
            default:
                console.log(`Unknown request: ${action}`);
        }
    });
    ws.on('close', () => {
        console.log('Stopping client connection.');
    });
});
