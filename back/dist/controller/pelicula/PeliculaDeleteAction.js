"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonResponse_1 = __importDefault(require("../../BuilderJsonResponse"));
const PeliculaModel_1 = require("../../db/PeliculaModel");
const PeliculaFindByIdAction_1 = __importDefault(require("./PeliculaFindByIdAction"));
const PeliculaDeleteAction = {
    validarParams: function (id) {
        let isValid = PeliculaFindByIdAction_1.default.validarParams(id);
        return isValid;
    },
    execute: function (res, id) {
        if (!this.validarParams(id)) {
            BuilderJsonResponse_1.default.Error(res, "datos inválidos ");
            return;
        }
        const promDelete = PeliculaModel_1.PeliculaModel.findByIdAndDelete(id);
        Promise.all([promDelete])
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
exports.default = PeliculaDeleteAction;
//# sourceMappingURL=PeliculaDeleteAction.js.map