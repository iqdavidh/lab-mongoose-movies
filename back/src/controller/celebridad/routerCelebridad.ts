import {Request, Response, NextFunction} from "express";
import CelebridadIndexAction from "./CelebridadIndexAction";
import CelebridadFindByIdAction from "./CelebridadFindByIdAction";
import CelebridadUpdatedAction from "./CelebridadUpdatedAction";
import CelebridadInsertAction from "./CelebridadInsertAction";

const express = require('express');
const routerCelebridad = express.Router();


/* index */
routerCelebridad.get('/index/:pagina?', (req: Request, res: Response, next: NextFunction) => {
   let pagina: string = req.params.pagina || 1;
   CelebridadIndexAction.execute(res, pagina);
});


/* find item */
routerCelebridad.get('/:id', (req: Request, res: Response, next: NextFunction) => {
   let id: string = req.params.id || 1;
   CelebridadFindByIdAction.execute(res, id);
});

/* update item */
routerCelebridad.put('/:id', (req: Request, res: Response, next: NextFunction) => {
   let id: string = req.params.id;
   let dataUpdate = req.body;
   CelebridadUpdatedAction.execute(res, id, dataUpdate);
});


/* post item */
routerCelebridad.post('/', (req: Request, res: Response, next: NextFunction) => {
   let dataInsert = req.body;
   CelebridadInsertAction.execute(res, dataInsert);
});


export default routerCelebridad;
