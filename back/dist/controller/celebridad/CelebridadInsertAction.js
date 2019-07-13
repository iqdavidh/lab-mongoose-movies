"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonResponse_1 = __importDefault(require("../../BuilderJsonResponse"));
const CelebridadModel_1 = require("../../db/CelebridadModel");
const CelebridadInsertAction = {
    getListaCamposPermitidos: function () {
        return ['name', 'occupation', 'catchPhrase'];
    },
    validarParams: function (dataInsert) {
        //buscar si tenemos datos permitidos
        let contadorCampos = 0;
        this.getListaCamposPermitidos().forEach(c => {
            if (dataInsert[c] !== undefined) {
                contadorCampos++;
            }
        });
        let isValid = true;
        if (contadorCampos === 0) {
            //falta parametos
            isValid = false;
        }
        return isValid;
    },
    execute: function (res, dataInsert) {
        if (!this.validarParams(dataInsert)) {
            BuilderJsonResponse_1.default.Error(res, "datos inválidos ");
            return;
        }
        //construir el object para insert
        let dataInsertValidado = {};
        this.getListaCamposPermitidos().forEach(c => {
            if (dataInsert[c] !== undefined) {
                dataInsertValidado[c] = dataInsert[c];
            }
        });
        const promInsert = CelebridadModel_1.CelebridadModel.create(dataInsert);
        Promise.all([promInsert])
            .then((values) => {
            const item = values[0];
            let data = {
                item: item
            };
            BuilderJsonResponse_1.default.Success(res, data);
        }).catch(error => {
            BuilderJsonResponse_1.default.Error(res, error);
        });
    }
};
exports.default = CelebridadInsertAction;
//# sourceMappingURL=CelebridadInsertAction.js.map