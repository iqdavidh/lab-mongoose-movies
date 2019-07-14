import ServerConfig from "../ServerConfig";

const mongoose = require("mongoose");


let url: string = ServerConfig.urlMongoServer + '/lab_celeb';

let opcionesMongoose: any = {
   useNewUrlParser: true
};

if (!ServerConfig.isServerDev) {
   const user = encodeURIComponent(ServerConfig.mongo_user);
   const password = encodeURIComponent(ServerConfig.mongo_pass);
   const authMechanism = 'DEFAULT';
   url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`;
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

export default {
   cx,
   CelebridadModel
}
