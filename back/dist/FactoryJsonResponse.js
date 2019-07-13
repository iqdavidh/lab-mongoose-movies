"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryJsonRespose = {
    Success: (res, dataResponse) => {
        dataResponse.success = true;
        return res.status(200).json(dataResponse);
    },
    Error: (res, error, code = 500) => {
        let dataResponse = {
            success: false
        };
        return res.status(200).json(dataResponse);
    }
};
exports.default = FactoryJsonRespose;
//# sourceMappingURL=FactoryJsonResponse.js.map