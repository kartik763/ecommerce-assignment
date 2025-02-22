const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {
  let createdProductId = '';
  let categoryId = '';

  beforeAll(async () => {

    const categoryRes = await request(app)
      .post('/api/categories')
      .send({ name: `Mobiles${Date.now()}` });

    categoryId = categoryRes.body.id;
  });

  it('should create a new product under a category', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: `iPhone14${Date.now()}`,
        description: 'Latest Apple iPhone',
        imageUrl: 'https://example.com/iphone14.jpg',
        categoryId: categoryId,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdProductId = res.body.id;
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a product by name', async () => {
    const res = await request(app).get(`/api/products/product-name/iPhone14${Date.now()}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(`iPhone14${Date.now()}`);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${createdProductId}`)
      .send({ name: 'iPhone 15' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('iPhone 15');
  });

  it('should delete a product', async () => {
    const res = await request(app).delete(`/api/products/${createdProductId}`);

    expect(res.status).toBe(200);
  });
});