const request = require('supertest');
const app = require('../app');

describe('Category API Tests', () => {
  let createdCategoryId = '';

  it('should create a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({ name: `Electronics${Date.now()}` });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdCategoryId = res.body.id;
  });

  it('should get all categories', async () => {
    const res = await request(app).get('/api/categories');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a category by name', async () => {
    const res = await request(app).get(`/api/categories/Electronics${Date.now()}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(`Electronics${Date.now()}`);
  });

  it('should update a category', async () => {
    const res = await request(app)
      .put(`/api/categories/${createdCategoryId}`)
      .send({ name: 'Home Appliances' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Home Appliances');
  });

  it('should delete a category', async () => {
    const res = await request(app).delete(`/api/categories/${createdCategoryId}`);

    expect(res.status).toBe(200);
  });
});