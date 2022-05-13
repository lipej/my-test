import { JwtSignToken } from '@app/services/jwt-sign-token';
import { FastifyRouteAdapter } from '@main/adapters';
import { FastifyMiddlewareAdapter } from '@main/adapters/fastify-middleware-adapter';
import { LoginControllerFactory } from '@main/factories/login';
import { UserActiveControllerFactory } from '@main/factories/user-active';
import { UserCreationControllerFactory } from '@main/factories/user-creation';
import { UserDataControllerFactory } from '@main/factories/user-data';
import { AuthMiddleware } from '@presentation/middlewares/auth';
import { FastifyInstance } from 'fastify';

import type { Params as LoginParams } from '@presentation/controllers/login';
import type { Params as UserActiveParams } from '@presentation/controllers/user-active';
import type { Params as UserCreationParams } from '@presentation/controllers/user-creation';
import type { Params as UserDataParams } from '@presentation/controllers/user-data';

type Request<T> = {
  Querystring: Partial<T>;
  Params: Partial<T>;
  Body: Partial<T>;
};

const tokenService = new JwtSignToken(process.env.JWT_SECRET as string);

const secureRoutesMiddlewares = [new FastifyMiddlewareAdapter(new AuthMiddleware(tokenService)).adapt()];

export const setupRoutes = (server: FastifyInstance) => {
  server.get('/health', function (_request, reply) {
    reply.send({ message: 'ALIVE!' });
  });

  server.get<Request<UserDataParams>>(
    '/user',
    { preHandler: secureRoutesMiddlewares },
    new FastifyRouteAdapter(UserDataControllerFactory.create()).adapt()
  );
  server.post<Request<UserCreationParams>>(
    '/user',
    new FastifyRouteAdapter(UserCreationControllerFactory.create()).adapt()
  );
  server.post<Request<UserActiveParams>>(
    '/active',
    new FastifyRouteAdapter(UserActiveControllerFactory.create()).adapt()
  );
  server.post<Request<LoginParams>>('/login', new FastifyRouteAdapter(LoginControllerFactory.create()).adapt());
};
