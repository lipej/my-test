import { FastifyInstance } from 'fastify'

export const setupRoutes = (server: FastifyInstance) => {
  server.get('/health', function (_request, reply) {
    reply.send({ message: "ALIVE!" })
  })
}
