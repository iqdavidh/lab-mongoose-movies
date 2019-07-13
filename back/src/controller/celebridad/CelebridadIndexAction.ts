import {Response} from "express";


import BuilderJsonresponse from "../../BuilderJsonResponse";
import {CelebridadModel} from "../../db/CelebridadModel";
import UrlApiConfig from "../../UrlApiConfig";
import ServerConfig from "../../ServerConfig";


const urlRel: string = UrlApiConfig.Celebridad;
const itemsXRequest = UrlApiConfig.itemsXRequest;

const CelebridadIndexAction = {

       getUrlNext: function (pagina: number) {
          return this.getUrl((pagina + 1).toString());
       },
       getUrl: function (pagina: string): string {
          return ServerConfig.urlApi + `/${urlRel}/${pagina}`;
       },
       validarParams: function (pagina: string): boolean {

          let paginaAsNumber = parseInt(pagina);

          //TODO agregar descripcion

          return (paginaAsNumber > 0 && paginaAsNumber < 1000);


       },
       execute: function (res: Response, pagina: string) {

          if (!this.validarParams(pagina)) {
             BuilderJsonresponse.Error(res, "Parámetro texto inválido");
             return;
          }

          const numPagina: number = parseInt(pagina);

          let next = this.getUrlNext(numPagina);


          const promTotal = CelebridadModel.collection.countDocuments({});


          const promItems = CelebridadModel
              .find({})
              .limit(itemsXRequest)
              .skip(itemsXRequest * (numPagina - 1))
              .sort({name: 'asc'})
              .exec()
          ;


          Promise.all([promTotal, promItems])
              .then((values) => {
                 const total = values[0];
                 const items = values[1];

                 let contador=itemsXRequest * (numPagina - 1) + items.length;

                 if(contador === total){
                    next='';
                 }

                 let data: any = {
                    total,
                    items,
                    pagina: numPagina,
                    next
                 };

                 BuilderJsonresponse.Success(res, data);

              }).catch(error => {

             BuilderJsonresponse.Error(res, error);
          });


       }
    }
;

export default CelebridadIndexAction;
