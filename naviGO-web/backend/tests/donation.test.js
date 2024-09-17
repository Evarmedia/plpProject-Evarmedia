const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Donation Routes', () => {
  it('should create a new donation', async () => {
    const response = await request(app)
      .post('/donations')
      .set('Authorization', 'Bearer YOUR_VALID_TOKEN_HERE') // Replace with a valid token
      .send({
        item_name: 'Books',
        item_type: 'in-kind',
        value: null,
        quantity: 100,
        user_id: 1,
        community_id: 1,
        donation_date: '2024-09-16',
        remaining_quantity: 100,
        status: 'pending'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('donation_id');
  });

  it('should get a donation by ID', async () => {
    const response = await request(app)
      .get('/donations/1')
      .set('Authorization', 'Bearer YOUR_VALID_TOKEN_HERE') // Replace with a valid token
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('item_name');
  });
});
