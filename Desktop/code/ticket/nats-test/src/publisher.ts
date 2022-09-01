import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const client = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

client.on('connect', async () => {
  console.log('Connected');

  const publisher = new TicketCreatedPublisher(client);
  try {
    publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.log(err);
  }
});

//   const data = JSON.stringify({
//     id: '1',
//     title: 'Test Title',
//     price: 100,
//   });

//   client.publish('ticket:created', data, () => {
//     console.log('Event published');
//   });
// });
