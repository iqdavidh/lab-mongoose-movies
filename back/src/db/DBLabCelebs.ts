import ServerConfig from "../ServerConfig";

const mongoose = require("mongoose");


const url: string = ServerConfig.urlMongoServer;

const dbName: string = "lab_celeb";

/* ************************************************ */
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const cx =mongoose.connect(url + "/" + dbName, {useNewUrlParser: true});



const CelebridadModel = require("./CelebridadModel");

export default {
   cx,
   CelebridadModel
}
