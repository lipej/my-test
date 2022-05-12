import Fastify from 'fastify'
import { setupRoutes } from './routes'

export const setupServer = () => {
  const fastifyServer = Fastify({
    logger: false
  })

  setupRoutes(fastifyServer)

  return fastifyServer
}
