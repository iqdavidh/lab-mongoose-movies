import {Request, Response, NextFunction} from "express";
import CelebridadIndexAction from "./CelebridadIndexAction";

const express = require('express');
const routerCelebridad = express.Router();


/* GET movies */
routerCelebridad.get('/:pagina?', (req: Request, res: Response, next: NextFunction) => {
   let pagina: string = req.params.pagina || 1;
   CelebridadIndexAction.execute(res,pagina);
});

 export default routerCelebridad;
