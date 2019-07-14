"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConfig_1 = __importDefault(require("../ServerConfig"));
const mongoose = require("mongoose");
let url = ServerConfig_1.default.urlMongoServer + '/lab_celeb';
let opcionesMongoose = {
    useNewUrlParser: true
};
if (!ServerConfig_1.default.isServerDev) {
    opcionesMongoose = {
        "user": ServerConfig_1.default.mongo_user,
        "pass": ServerConfig_1.default.mongo_pass,
        useNewUrlParser: true
    };
}
console.log(url);
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const cx = mongoose.connect(url, opcionesMongoose);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('db conectada');
});
const CelebridadModel = require("./CelebridadModel");
exports.default = {
    cx,
    CelebridadModel
};
//# sourceMappingURL=DBLabCelebs.js.map