"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConfig_1 = __importDefault(require("../ServerConfig"));
const mongoose = require("mongoose");
const url = ServerConfig_1.default.urlMongoServer + '/lab_celeb';
console.log(url);
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const cx = mongoose.connect(url, { useNewUrlParser: true });
const CelebridadModel = require("./CelebridadModel");
exports.default = {
    cx,
    CelebridadModel
};
//# sourceMappingURL=DBLabCelebs.js.map