import {ConnectionOptions} from 'typeorm';
import * as PostgressConnectionStringParser from 'pg-connection-string';

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

export function getConnectionOptions(env: string): ConnectionOptions {
  if (env === 'prod') {
    const parsedOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL || '');
    const overrides = {
      host: parsedOptions.host,
      port: parsedOptions.port,
      username: parsedOptions.user,
      password: parsedOptions.password,
      database: parsedOptions.database,
      extras: {
        ssl: true
      }
    };
    return {...BASE_CONFIG, ...overrides} as ConnectionOptions;
  }
  return BASE_CONFIG;
};
