import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testauth@finance.com',
        password: 'password123',
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.token).toBeDefined();
  });

  it('should not register user with existing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testauth@finance.com',
        password: 'password123',
      });
      
    expect(res.statusCode).toEqual(400);
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testauth@finance.com',
        password: 'password123',
      });
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.token).toBeDefined();
  });
});
