import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it(' fails when a email that does not exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'foo@bar.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when invalid password is provided', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'foo@bar.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'foo@bar.com',
      password: 'pasord',
    })
    .expect(400);
});

it('response with a cookie with valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'foo@bar.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'foo@bar.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
