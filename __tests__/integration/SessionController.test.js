import request from 'supertest';
import app from '../../src/app';

describe('Session', () => {
  it('should be able to authenticate user', async () => {
    const user = {
      email: 'admin@fastfeet.com',
      password: '123456',
    };
    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.body).toHaveProperty('token');
  });
});
