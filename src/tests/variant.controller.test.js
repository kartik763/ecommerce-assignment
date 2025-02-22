const request = require('supertest');
const app = require('../app');

describe('Variant API Tests', () => {
  let createdVariantId = '';
  let productId = '';

  beforeAll(async () => {
    const categoryRes = await request(app)
      .post('/api/categories')
      .send({ name: `Mobiles${Date.now()}` });

    const categoryId = categoryRes.body.id;
    const productRes = await request(app)
      .post('/api/products')
      .send({
        name: 'iPhone 14',
        description: 'Latest Apple iPhone',
        imageUrl: 'https://example.com/iphone14.jpg',
        categoryId: categoryId,
      });

    productId = productRes.body.id;
  });

  it('should create a new variant for a product', async () => {
    const res = await request(app)
      .post('/api/variants')
      .send({
        name: 'iPhone 14 - 128GB',
        mrp: 99999,
        discountPrice: 94999,
        size: '128GB',
        color: 'Black',
        productId: productId,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdVariantId = res.body.id;
  });

  it('should get all variants', async () => {
    const res = await request(app).get('/api/variants');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a variant by ID', async () => {
    const res = await request(app).get(`/api/variants/${createdVariantId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdVariantId);
  });

  it('should update a variant', async () => {
    const res = await request(app)
      .put(`/api/variants/${createdVariantId}`)
      .send({ color: 'White' });

    expect(res.status).toBe(200);
    expect(res.body.color).toBe('White');
  });

  it('should delete a variant', async () => {
    const res = await request(app).delete(`/api/variants/${createdVariantId}`);

    expect(res.status).toBe(200);
  });
});