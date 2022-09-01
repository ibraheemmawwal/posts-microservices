import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
  var signin: () => string[];
}
jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  mongoose.connection.close();
});

global.signin = () => {
  // build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  // create a JWT token with payload
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build seesion object with jwt. { jwt: MY_JWT }
  const session = { jwt: token };
  //turn session object into json
  const sessionJSON = JSON.stringify(session);

  //  take json and encode to base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return a cookie with the encoded data
  return [`session=${base64}`];
};
