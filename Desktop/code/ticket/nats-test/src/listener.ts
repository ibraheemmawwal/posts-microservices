///<reference path="../node_modules/@types/node/index.d.ts"/>

import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
import { randomBytes } from 'crypto';
console.clear();

const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

client.on('connect', () => {
  console.log('Connected');

  client.on('close', () => {
    console.log('Disconnected');
    process.exit();
  });

  new TicketCreatedListener(client).listen();
});

process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());
