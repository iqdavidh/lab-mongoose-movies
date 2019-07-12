'use strict';

import {Application, Request, Response} from "express";
import UrlApi from "./UrlApiConfig";
import routerCelebridad from "./controller/celebridad/routerCelebridad";
import BuilderJsonresponse from "./BuilderJsonResponse";


const Config = require('./Config').default;

const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const cors = require('cors');

const app: Application = express();

app.use(cors());

if (Config.isServerDev) {
   const logger = require('morgan');
   app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());




app.get("/", function (req, res) {
   BuilderJsonresponse.Success(res,{});
});


/* celebridad ********************************************** */

const urlRelCelebridad= UrlApi.Celebridad;

app.use(`/api/${urlRelCelebridad}`, routerCelebridad);


/* server ************************************************* */

const port: number = Config.backPort;
app.listen(port, () => {
   console.log(`app on port ${port}!`)
});
