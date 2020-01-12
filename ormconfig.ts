import {ConnectionOptions} from 'typeorm';

const BASE_CONFIG: ConnectionOptions = {
   "type": "postgres",
   "synchronize": true,
   "logging": false,
   "entities": [
      "entity/*.ts"
   ],
   "migrations": [
      "migration/**/*.ts"
   ],
   "subscribers": [
      "subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "entity",
      "migrationsDir": "migration",
      "subscribersDir": "subscriber"
   }
};

const PROD_OVERRIDES = {
  extras: {
    ssl: true
  }
};

export function getConnectionOptions(env: string): ConnectionOptions {
  if (env === 'prod') {
    return {...BASE_CONFIG, ...PROD_OVERRIDES} as ConnectionOptions;
  }
  return BASE_CONFIG;
};
