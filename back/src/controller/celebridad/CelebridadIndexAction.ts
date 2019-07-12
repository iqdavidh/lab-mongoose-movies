import {Response} from "express";

import UrlApiConfig from "../../UrlApiConfig";
import BuilderJsonresponse from "../../BuilderJsonResponse";
import {CelebridadModel} from "../../db/CelebridadModel";


const urlRel: string = UrlApiConfig.Celebridad;
const itemsXRequest = UrlApiConfig.itemsXRequest;

const CelebridadIndexAction = {

       getUrlNext: function (pagina: number) {
          return this.getUrl((pagina + 1).toString());
       },
       getUrl: function (pagina: string): string {
          return UrlApiConfig.urlApi + `${urlRel}/${pagina}`;
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

          const next = this.getUrlNext(numPagina);

          const promTotal = CelebridadModel.count({});
          const promItems = CelebridadModel
              .find({})
              .limit(itemsXRequest)
              .skip(itemsXRequest * (numPagina - 1))
              .sort({name: 'asc'})
          ;


          Promise.all([promTotal, promItems]).then((values) => {
             const total = values[0];
             const items = values[1];

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
