import { setupServer } from '@main/fastify';

describe('route test', () => {
  const server = setupServer();
  it('should get health', async () => {
    expect(
      await server
        .inject({
          method: 'GET',
          path: '/health'
        })
        .then((response) => response.json())
    ).toStrictEqual({ message: 'ALIVE!' });
  });
});
