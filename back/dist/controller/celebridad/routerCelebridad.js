"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CelebridadIndexAction_1 = __importDefault(require("./CelebridadIndexAction"));
const CelebridadFindByIdAction_1 = __importDefault(require("./CelebridadFindByIdAction"));
const CelebridadUpdatedAction_1 = __importDefault(require("./CelebridadUpdatedAction"));
const express = require('express');
const routerCelebridad = express.Router();
/* index */
routerCelebridad.get('/index/:pagina?', (req, res, next) => {
    let pagina = req.params.pagina || 1;
    CelebridadIndexAction_1.default.execute(res, pagina);
});
/* find item */
routerCelebridad.get('/item/:id', (req, res, next) => {
    let id = req.params.id || 1;
    CelebridadFindByIdAction_1.default.execute(res, id);
});
/* update item */
routerCelebridad.put('/item/:id', (req, res, next) => {
    let id = req.params.id;
    let dataUpdate = req.body;
    CelebridadUpdatedAction_1.default.execute(res, id, dataUpdate);
});
exports.default = routerCelebridad;
//# sourceMappingURL=routerCelebridad.js.map