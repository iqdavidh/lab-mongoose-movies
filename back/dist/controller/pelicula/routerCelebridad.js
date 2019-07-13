"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PeliculaIndexAction_1 = __importDefault(require("./PeliculaIndexAction"));
const PeliculaFindByIdAction_1 = __importDefault(require("./PeliculaFindByIdAction"));
const PeliculaUpdatedAction_1 = __importDefault(require("./PeliculaUpdatedAction"));
const PeliculaInsertAction_1 = __importDefault(require("./PeliculaInsertAction"));
const PeliculaDeleteAction_1 = __importDefault(require("./PeliculaDeleteAction"));
const express = require('express');
const routerPelicula = express.Router();
/* index */
routerPelicula.get('/index/:pagina?', (req, res, next) => {
    let pagina = req.params.pagina || 1;
    PeliculaIndexAction_1.default.execute(res, pagina);
});
/* find item */
routerPelicula.get('/:id', (req, res, next) => {
    let id = req.params.id || 1;
    PeliculaFindByIdAction_1.default.execute(res, id);
});
/* update item */
routerPelicula.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let dataUpdate = req.body;
    PeliculaUpdatedAction_1.default.execute(res, id, dataUpdate);
});
/* post item */
routerPelicula.post('/', (req, res, next) => {
    let dataInsert = req.body;
    PeliculaInsertAction_1.default.execute(res, dataInsert);
});
/* delete item */
routerPelicula.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    PeliculaDeleteAction_1.default.execute(res, id);
});
exports.default = routerPelicula;
//# sourceMappingURL=routerCelebridad.js.map