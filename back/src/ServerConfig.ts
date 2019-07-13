const env = require("../../../../apps/env.json");

const backPort: Number = 3002;
const frontPort: Number = 4002;

const urlFront: String = env.site + `:${frontPort}`;
const urlApi: String = env.site + `:${backPort}/api`;

const isServerDev: boolean = env.server === "local";

const urlMongoServer :string = env.urlMongoServer;

const ServerConfig: any = {
   isServerDev:isServerDev,
   urlMongoServer:urlMongoServer,
   backPort:backPort,
   frontPort:frontPort,
   urlFront:urlFront,
   urlApi:urlApi
};

export default ServerConfig;
