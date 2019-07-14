import ServerConfig from "../ServerConfig";

const mongoose = require("mongoose");


const url: string = ServerConfig.urlMongoServer + '/lab_celeb';

console.log(url);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const cx = mongoose.connect(url, {useNewUrlParser: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   // we're connected!
   console.log('db conectada');
});


const CelebridadModel = require("./CelebridadModel");

export default {
   cx,
   CelebridadModel
}
