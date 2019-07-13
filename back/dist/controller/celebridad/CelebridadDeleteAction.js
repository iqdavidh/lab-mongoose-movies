"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonResponse_1 = __importDefault(require("../../BuilderJsonResponse"));
const CelebridadModel_1 = require("../../db/CelebridadModel");
const CelebridadFindByIdAction_1 = __importDefault(require("./CelebridadFindByIdAction"));
const CelebridadDeleteAction = {
    validarParams: function (id) {
        let isValid = CelebridadFindByIdAction_1.default.validarParams(id);
        return isValid;
    },
    execute: function (res, id) {
        if (!this.validarParams(id)) {
            BuilderJsonResponse_1.default.Error(res, "datos inválidos ");
            return;
        }
        const promDelete = CelebridadModel_1.CelebridadModel.findByIdAndDelete(id);
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
exports.default = CelebridadDeleteAction;
//# sourceMappingURL=CelebridadDeleteAction.js.map