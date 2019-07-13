import {Request, Response, NextFunction} from "express";
import PeliculaIndexAction from "./PeliculaIndexAction";
import PeliculaFindByIdAction from "./PeliculaFindByIdAction";
import PeliculaUpdatedAction from "./PeliculaUpdatedAction";
import PeliculaInsertAction from "./PeliculaInsertAction";
import PeliculaDeleteAction from "./PeliculaDeleteAction";

const express = require('express');
const routerPelicula = express.Router();


/* index */
routerPelicula.get('/index/:pagina?', (req: Request, res: Response, next: NextFunction) => {
   let pagina: string = req.params.pagina || 1;
   PeliculaIndexAction.execute(res, pagina);
});


/* find item */
routerPelicula.get('/:id', (req: Request, res: Response, next: NextFunction) => {
   let id: string = req.params.id || 1;
   PeliculaFindByIdAction.execute(res, id);
});

/* update item */
routerPelicula.put('/:id', (req: Request, res: Response, next: NextFunction) => {
   let id: string = req.params.id;
   let dataUpdate = req.body;
   PeliculaUpdatedAction.execute(res, id, dataUpdate);
});


/* post item */
routerPelicula.post('/', (req: Request, res: Response, next: NextFunction) => {
   let dataInsert = req.body;
   PeliculaInsertAction.execute(res, dataInsert);
});


/* delete item */
routerPelicula.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
   let id: string = req.params.id;
   PeliculaDeleteAction.execute(res,id);
});

export default routerPelicula;
