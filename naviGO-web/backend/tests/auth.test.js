const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Auth Routes', () => {
  it('should allow users to register', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'donor'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should allow users to login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
