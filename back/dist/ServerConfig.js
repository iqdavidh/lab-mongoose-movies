"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require("../../../../apps/env.json");
const backPort = 3002;
const frontPort = 4002;
const urlFront = env.site + `:${frontPort}`;
const urlApi = env.site + `:${backPort}/api`;
const isServerDev = env.server === "local";
const urlMongoServer = env.urlMongoServer;
const ServerConfig = {
    isServerDev: isServerDev,
    urlMongoServer: urlMongoServer,
    mongo_user: env.mongo_user,
    mongo_pass: env.mongo_pass,
    backPort: backPort,
    frontPort: frontPort,
    urlFront: urlFront,
    urlApi: urlApi
};
exports.default = ServerConfig;
//# sourceMappingURL=ServerConfig.js.map