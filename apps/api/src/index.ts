import { getEnv } from '@app/config';
import { setupServer } from '@main/fastify';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: getEnv('sentryDsn'),
  enabled: getEnv('nodeEnv') !== 'test',
  environment: getEnv('runningEnv')
});

const server = setupServer();

server.setErrorHandler(async (error, _request, reply) => {
  Sentry.captureException(error);
  reply.status(500).send({ error: error.message });
});

server.register(require('fastify-cors'), {
  origin: getEnv('frontUrl')
});

server.listen(getEnv('port'), '0.0.0.0', function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
