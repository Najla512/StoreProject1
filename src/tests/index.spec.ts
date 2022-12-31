import supertest from 'supertest'
import app from '../server'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test hello  endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Test users endpoint response', () => {
  it('test users  endpoint', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(200)
  })
})

describe('Test show user by id endpoint response', () => {
  it('test show user by id  endpoint', async () => {
    const response = await request.get('/user?id=1')
    expect(response.status).toBe(200)
  })
})


describe('Test create user endpoint response', () => {
  it('test create user  endpoint', async () => {
    const response = await request.post('/user?firstname=Nawaf&lastname=hamad&password=321')
    expect(response.status).toBe(200)
  })
})

describe('Test products endpoint response', () => {
  it('test products  endpoint', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })
})

describe('Test product by id endpoint response', () => {
  it('test product by id  endpoint', async () => {
    const response = await request.get('/product?id=2')
    expect(response.status).toBe(200)
  })
})


describe('Test orders endpoint response', () => {
  it('test orders  endpoint', async () => {
    const response = await request.get('/orders')
    expect(response.status).toBe(200)
  })
})

describe('Test order by id endpoint response', () => {
  it('test show order by id endpoint', async () => {
    const response = await request.get('/order?id=2')
    expect(response.status).toBe(200)
  })
})

describe('Test order show order Complete endpoint response', () => {
  it('test order show orderComplete endpoint', async () => {
    const response = await request.get('/orderComplete?id=5')
    expect(response.status).toBe(200)
  })
})

describe('Test order show Creat order endpoint response', () => {
  it('test order show Creat Order endpoint', async () => {
    const response = await request.post('/CreatOrder?quantity=1&order_id=1&product_id=2')
    expect(response.status).toBe(200)
  })
})





