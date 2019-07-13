'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UrlApiConfig_1 = __importDefault(require("./UrlApiConfig"));
const routerCelebridad_1 = __importDefault(require("./controller/celebridad/routerCelebridad"));
const BuilderJsonResponse_1 = __importDefault(require("./BuilderJsonResponse"));
const DBLabCelebs_1 = __importDefault(require("./db/DBLabCelebs"));
const Config = require('./Config').default;
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors());
if (Config.isServerDev) {
    const logger = require('morgan');
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
DBLabCelebs_1.default.cx;
app.get("/", function (req, res) {
    BuilderJsonResponse_1.default.Success(res, {});
});
/* celebridad ********************************************** */
const urlRelCelebridad = UrlApiConfig_1.default.Celebridad;
let url = `/api/${urlRelCelebridad}`;
console.log(url);
app.use(url, routerCelebridad_1.default);
/* server ************************************************* */
const port = Config.backPort;
app.listen(port, () => {
    console.log(`app on port ${port}!`);
});
//# sourceMappingURL=server.js.map