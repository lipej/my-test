import { Controller } from '@presentation/protocols';
import { FastifyReply, FastifyRequest } from 'fastify';

export class FastifyRouteAdapter<T> {
  constructor(private readonly controller: Controller<T>) {}

  adapt =
    () =>
    async (
      request: FastifyRequest<{
        Querystring: Partial<T>;
        Params: Partial<T>;
        Body: Partial<T>;
      }>,
      reply: FastifyReply
    ) => {
      const { body, query, params } = request;
      const input = { ...body, ...params, ...query } as T;
      const { status, data, message } = await this.controller.handle(input);
      if (status === 200) return reply.status(status).send(data);
      return reply.status(status).send(message);
    };
}
