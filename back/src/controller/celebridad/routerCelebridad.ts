import {Request, Response, NextFunction} from "express";
import CelebridadIndexAction from "./CelebridadIndexAction";
import CelebridadFindByIdAction from "./CelebridadFindByIdAction";

const express = require('express');
const routerCelebridad = express.Router();


/* index */
routerCelebridad.get('/page/:pagina?', (req: Request, res: Response, next: NextFunction) => {
   let pagina: string = req.params.pagina || 1;
   CelebridadIndexAction.execute(res,pagina);
});


/* find item */
routerCelebridad.get('/item/:id', (req: Request, res: Response, next: NextFunction) => {
   let id: string = req.params.id || 1;
   CelebridadFindByIdAction.execute(res,id);
});

 export default routerCelebridad;
