import { Middleware } from '@presentation/protocols/middleware';
import { FastifyReply, FastifyRequest } from 'fastify';

export class FastifyMiddlewareAdapter<T> {
  constructor(private middleware: Middleware<T>) {}

  adapt() {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const { headers } = request;
      const input = { ...headers } as unknown as T;

      const data = await this.middleware.handle(input);

      if (data.status) {
        return reply.status(data.status).send({ error: data.message });
      }

      if (data.fields) {
        const newParams = Object.assign({}, request.params, {
          ...data.fields
        });

        request.params = newParams;
      }
    };
  }
}
