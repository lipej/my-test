import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (name: keyof typeof envs) => {
  const env = envs[name];

  if (!env) throw new Error('environment not available: ' + name);

  return env;
};

export const envs = {
  sentryDsn: <string>process.env.SENTRY_DSN,
  port: <string>process.env.PORT || '4001',
  nodeEnv: <string>process.env.NODE_ENV,
  runningEnv: <string>process.env.RUNNING_ENV,
  jwtSecret: <string>process.env.JWT_SECRET,
  cryptSecret: <string>process.env.CRYPT_SECRET,
  sendgridKey: <string>process.env.SENDGRID_KEY,
  sendgridFrom: <string>process.env.SENDGRID_FROM,
  frontUrl: <string>process.env.FRONT_URL
};
