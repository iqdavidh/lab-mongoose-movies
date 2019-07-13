"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderJsonresponse = {
    Success: (res, dataResponse) => {
        let data = {
            success: true,
            msg: '',
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