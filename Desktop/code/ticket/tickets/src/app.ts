import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { newTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { showAllTicketRouter } from './routes/index';
import { updateTicket } from './routes/update';

import { errorHandler, NotFoundError, currentUser } from '@ibtickects/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(showAllTicketRouter);
app.use(updateTicket);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
