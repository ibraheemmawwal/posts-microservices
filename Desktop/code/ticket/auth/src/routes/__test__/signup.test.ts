import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@email.com',
      password: 'test',
    })
    .expect(201);
});

it('returns a 400 on unsuccessful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '',
      password: 'test',
    })
    .expect(400);
});

it('dissallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'foo@example.com',
      password: 'test',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'foo@example.com',
      password: 'test',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'foo@example.com',
      password: 'test',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
