const ws = require('ws');
const http = require('http');
const express = require('express');
const Transceiver = require('./transceiver');
const tickersConfig = require('./config');
const WebSocketServer = ws.Server;

const port = process.env.WS_PORT || 3232;
const handler = express();
handler.use(express.json());
handler.use(express.urlencoded({ extended: true }));
handler.get(
    '/markets',
    (req, res) => {
        console.log('bah');
        return res.status(200).json({
            ...tickersConfig
        })
    }
)

// const server = http.createServer(handler);
const wss = new WebSocketServer({ server: handler });
const transceiver = new Transceiver();

wss.on('connection', (ws, req) => {
    console.log(`Connection request from: ${req.connection.remoteAddress}`);
    ws.on('message', (data) => {
        console.log('data: ', data);
        const json = JSON.parse(data);
        const action = json.action;
        const market = json.market;

        switch (action) {
            case 'SUBSCRIBE':
                transceiver.subscribe(ws, market);
                break;
            case 'UNSUBSCRIBE':
                transceiver.unsubscribe(ws, market);
                break;
            default:
                console.log(`Unknown request: ${action}`);
        }
    });
    ws.on('close', () => {
        console.log('Stopping client connection.');
    });
});

handler.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
