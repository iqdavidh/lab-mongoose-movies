"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonResponse_1 = __importDefault(require("../../BuilderJsonResponse"));
const PeliculaModel_1 = require("../../db/PeliculaModel");
const PeliculaFindByIdAction = {
    validarParams: function (id) {
        let isValid = true;
        if (id == null || id.length == 0 || id.length > 50) {
            isValid = false;
        }
        return isValid;
    },
    execute: function (res, id) {
        if (!this.validarParams(id)) {
            BuilderJsonResponse_1.default.Error(res, "id inválido : " + id);
            return;
        }
        const promFind = PeliculaModel_1.PeliculaModel.findById(id);
        Promise.all([promFind])
            .then((values) => {
            const item = values[0];
            let data = {
                item
            };
            BuilderJsonResponse_1.default.Success(res, data);
        }).catch(error => {
            BuilderJsonResponse_1.default.Error(res, error);
        });
    }
};
exports.default = PeliculaFindByIdAction;
//# sourceMappingURL=PeliculaFindByIdAction.js.map