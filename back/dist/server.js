'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UrlApiConfig_1 = __importDefault(require("./UrlApiConfig"));
const routerCelebridad_1 = __importDefault(require("./controller/celebridad/routerCelebridad"));
const BuilderJsonResponse_1 = __importDefault(require("./BuilderJsonResponse"));
const DBLabCelebs_1 = __importDefault(require("./db/DBLabCelebs"));
const routerPelicula_1 = __importDefault(require("./controller/pelicula/routerPelicula"));
const Config = require('./Config').default;
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors());
DBLabCelebs_1.default.cx;
if (Config.isServerDev) {
    const logger = require('morgan');
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", function (req, res) {
    BuilderJsonResponse_1.default.Success(res, {});
});
/* celebridad ********************************************** */
{
    let url = `/api/${UrlApiConfig_1.default.Celebridades}`;
    console.log(url);
    app.use(url, routerCelebridad_1.default);
}
/* peliculas ********************************************** */
{
    let url = `/api/${UrlApiConfig_1.default.Peliculas}`;
    console.log(url);
    app.use(url, routerPelicula_1.default);
}
/* server ************************************************* */
const port = Config.backPort;
app.listen(port, () => {
    console.log(`app on port ${port}!`);
});
//# sourceMappingURL=server.js.map