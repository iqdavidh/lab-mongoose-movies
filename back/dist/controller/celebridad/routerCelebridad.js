"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CelebridadIndexAction_1 = __importDefault(require("./CelebridadIndexAction"));
const express = require('express');
const routerCelebridad = express.Router();
/* GET movies */
routerCelebridad.get('/:pagina?', (req, res, next) => {
    let pagina = req.params.pagina || 1;
    CelebridadIndexAction_1.default.execute(res, pagina);
});
exports.default = routerCelebridad;
//# sourceMappingURL=routerCelebridad.js.map