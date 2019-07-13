"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonResponse_1 = __importDefault(require("../../BuilderJsonResponse"));
const CelebridadModel_1 = require("../../db/CelebridadModel");
const UrlApiConfig_1 = __importDefault(require("../../UrlApiConfig"));
const ServerConfig_1 = __importDefault(require("../../ServerConfig"));
const urlRel = UrlApiConfig_1.default.Celebridades;
const itemsXRequest = UrlApiConfig_1.default.itemsXRequest;
const CelebridadIndexAction = {
    getUrlNext: function (pagina) {
        return this.getUrl((pagina + 1).toString());
    },
    getUrl: function (pagina) {
        return ServerConfig_1.default.urlApi + `/${urlRel}/${pagina}`;
    },
    validarParams: function (pagina) {
        let paginaAsNumber = parseInt(pagina);
        //TODO agregar descripcion
        return (paginaAsNumber > 0 && paginaAsNumber < 1000);
    },
    execute: function (res, pagina) {
        if (!this.validarParams(pagina)) {
            BuilderJsonResponse_1.default.Error(res, "Parámetro texto inválido");
            return;
        }
        const numPagina = parseInt(pagina);
        let next = this.getUrlNext(numPagina);
        const promTotal = CelebridadModel_1.CelebridadModel.collection.countDocuments({});
        const promItems = CelebridadModel_1.CelebridadModel
            .find({})
            .limit(itemsXRequest)
            .skip(itemsXRequest * (numPagina - 1))
            .sort({ name: 'asc' })
            .exec();
        Promise.all([promTotal, promItems])
            .then((values) => {
            const total = values[0];
            const items = values[1];
            let contador = itemsXRequest * (numPagina - 1) + items.length;
            if (contador === total) {
                next = '';
            }
            let data = {
                total,
                items,
                pagina: numPagina,
                next
            };
            BuilderJsonResponse_1.default.Success(res, data);
        }).catch(error => {
            BuilderJsonResponse_1.default.Error(res, error);
        });
    }
};
exports.default = CelebridadIndexAction;
//# sourceMappingURL=CelebridadIndexAction.js.map