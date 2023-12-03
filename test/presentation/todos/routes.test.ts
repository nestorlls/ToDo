import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgresql';
import { skip } from 'node:test';

describe('Test Todo routes.ts Routes', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  afterEach(async () => {
    await prisma.todo.deleteMany();
  });

  const endPoint = '/api/v1/todos';
  const todo1 = { text: 'Todo 1' };
  const todo2 = { text: 'Todo 2' };

  test('Should return TODOs', async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app).get(endPoint).expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[1].completedAt).toBeNull();
  });

  test('Should return TODO by id', async () => {
    skip;
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`${endPoint}/${todo.id}`)
      .expect(200);

    expect(body).toBeInstanceOf(Object);
    expect(body.text).toBe(todo1.text);
    expect(body.completedAt).toBeNull();
    expect(body).toEqual({
      id: todo.id,
      text: todo1.text,
      completedAt: todo.completedAt,
    });
  });

  test('Should return 404 when TODO not found', async () => {
    const todoId = 1;

    const { body } = await request(testServer.app)
      .get(`${endPoint}/${todoId}`)
      .expect(404);

    expect(body).toEqual({
      error: `Todo with id ${todoId} not found`,
      statusCode: 404,
    });
  });

  test('Should return new TODO api/todos', async () => {
    const { body } = await request(testServer.app)
      .post(endPoint)
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
  });

  test('Should return error if text is empty', async () => {
    const { body } = await request(testServer.app)
      .post(endPoint)
      .send({ text: '' })
      .expect(400);

    expect(body).toEqual({ error: 'Property "Text" is required' });
  });

  test('Should return error if text is undefined', async () => {
    const { body } = await request(testServer.app)
      .post(endPoint)
      .send({})
      .expect(400);

    expect(body).toEqual({ error: expect.any(String) });
  });

  test('Should return an updated TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`${endPoint}/${todo.id}`)
      .send({ text: 'Updated todo', completedAt: '2013-01-01' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Updated todo',
      completedAt: '2013-01-01T00:00:00.000Z',
    });
  });

  test('Should return error 400 if "completedAt" is invalid', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`${endPoint}/${todo.id}`)
      .send({ text: 'Updated todo', completedAt: 'invalid date' })
      .expect(400);

    expect(body).toEqual({
      error: 'Property "CompletedAt" must be a valid date',
    });
  });

  test('Should return update TODO if update only the date', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`${endPoint}/${todo.id}`)
      .send({ completedAt: '2013-01-01' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: '2013-01-01T00:00:00.000Z',
    });
  });

  test('Should delete TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .delete(`${endPoint}/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo.text,
      completedAt: null,
    });
  });
});
