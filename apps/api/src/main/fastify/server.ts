import Fastify from 'fastify';
import { setupRoutes } from './routes';

export const setupServer = () => {
  const fastifyServer = Fastify({
    logger: true
  });

  setupRoutes(fastifyServer);

  return fastifyServer;
};
