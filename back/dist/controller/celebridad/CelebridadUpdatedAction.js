"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonResponse_1 = __importDefault(require("../../BuilderJsonResponse"));
const CelebridadModel_1 = require("../../db/CelebridadModel");
const CelebridadFindByIdAction_1 = __importDefault(require("./CelebridadFindByIdAction"));
const CelebridadUpdatedAction = {
    getListaCamposPermitidos: function () {
        return ['name', 'occupation', 'catchPhrase'];
    },
    validarParams: function (id, dataUpdate) {
        let isValid = CelebridadFindByIdAction_1.default.validarParams(id);
        //buscar si tenemos datos permitidos
        let contadorCampos = 0;
        this.getListaCamposPermitidos().forEach(c => {
            if (dataUpdate[c] !== undefined) {
                contadorCampos++;
            }
        });
        if (contadorCampos === 0) {
            //falta parametos
            isValid = false;
        }
        return isValid;
    },
    execute: function (res, id, dataUpdate) {
        if (!this.validarParams(id, dataUpdate)) {
            BuilderJsonResponse_1.default.Error(res, "datos inválidos ");
            return;
        }
        //construir el object para update
        let dataUpdateValidado = {};
        this.getListaCamposPermitidos().forEach(c => {
            if (dataUpdate[c] !== undefined) {
                dataUpdateValidado[c] = dataUpdate[c];
            }
        });
        const promUpdate = CelebridadModel_1.CelebridadModel.findByIdAndUpdate(id, { $set: dataUpdateValidado }, {
            new: false, upsert: false
        });
        Promise.all([promUpdate])
            .then((values) => {
            const item = values[0];
            let data = {
                id
            };
            BuilderJsonResponse_1.default.Success(res, data);
        }).catch(error => {
            BuilderJsonResponse_1.default.Error(res, error);
        });
    }
};
exports.default = CelebridadUpdatedAction;
//# sourceMappingURL=CelebridadUpdatedAction.js.map