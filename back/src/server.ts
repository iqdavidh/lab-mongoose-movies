'use strict';

import {Application, Request, Response} from "express";
import UrlApiConfig from "./UrlApiConfig";
import routerCelebridad from "./controller/celebridad/routerCelebridad";
import BuilderJsonresponse from "./BuilderJsonResponse";
import DBLabCelebs from "./db/DBLabCelebs";
import routerPelicula from "./controller/pelicula/routerPelicula";


const Config = require('./Config').default;

const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const cors = require('cors');

const app: Application = express();


app.use(cors());

DBLabCelebs.cx;

if (Config.isServerDev) {
   const logger = require('morgan');
   app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.get("/", function (req, res) {
   BuilderJsonresponse.Success(res, {})
});


/* celebridad ********************************************** */
{
   let url = `/api/${UrlApiConfig.Celebridades}`;
   console.log(url);
   app.use(url, routerCelebridad);

}


/* peliculas ********************************************** */
{
   let url = `/api/${UrlApiConfig.Peliculas}`;
   console.log(url);
   app.use(url, routerPelicula);
}


/* server ************************************************* */

const port: number = Config.backPort;
app.listen(port, () => {
   console.log(`app on port ${port}!`)
});
