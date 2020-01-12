"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BASE_CONFIG = {
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
function getConnectionOptions(env) {
    if (env === 'prod') {
        return Object.assign(Object.assign({}, BASE_CONFIG), PROD_OVERRIDES);
    }
    return BASE_CONFIG;
}
exports.getConnectionOptions = getConnectionOptions;
;
//# sourceMappingURL=ormconfig.js.map