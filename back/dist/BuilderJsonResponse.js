"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonresponse = {
    Success: (res, dataResponse, msg = '') => {
        let data = {
            success: true,
            msg: msg,
            data: dataResponse
        };
        res.status(200).json(data);
    },
    NotSuccess: (res, dataResponse, msg = '') => {
        let data = {
            success: false,
            msg: msg,
            data: dataResponse
        };
        res.status(200).json(data);
    },
    Error: (res, error, code = 500) => {
        let data = {
            success: false,
            msg: error
        };
        res.status(code).json(data);
    }
};
exports.default = BuilderJsonresponse;
//# sourceMappingURL=BuilderJsonResponse.js.map