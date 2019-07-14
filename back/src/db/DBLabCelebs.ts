import ServerConfig from "../ServerConfig";

const mongoose = require("mongoose");


const url: string = ServerConfig.urlMongoServer +'/lab_celeb';

console.log(url);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const cx =mongoose.connect(url , {useNewUrlParser: true});

const CelebridadModel = require("./CelebridadModel");

export default {
   cx,
   CelebridadModel
}
