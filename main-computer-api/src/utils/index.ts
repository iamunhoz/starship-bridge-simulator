type TEnvName = 'DATABASE_URL' | 'JWT_SECRET';

export function getEnvOrThrow(envName: TEnvName) {
  if (!process.env[envName]) {
    throw new Error(`cannot find ${envName} in environment`);
  }

  return process.env[envName];
}
