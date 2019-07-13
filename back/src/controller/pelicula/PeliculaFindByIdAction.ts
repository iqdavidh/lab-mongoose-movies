import {Response} from "express";


import BuilderJsonresponse from "../../BuilderJsonResponse";
import {PeliculaModel} from "../../db/PeliculaModel";


const PeliculaFindByIdAction = {


       validarParams: function (id: string): boolean {

          let isValid = true;

          if (id == null || id.length == 0 || id.length > 50) {
             isValid = false;
          }

          return isValid;
       },
       execute: function (res: Response, id: string) {

          if (!this.validarParams(id)) {
             BuilderJsonresponse.Error(res, "id inválido : " + id);
             return;
          }

          const promFind = PeliculaModel.findById(id);

          Promise.all([promFind])
              .then((values) => {
                 const item = values[0];

                 let data: any = {
                    item
                 };

                 BuilderJsonresponse.Success(res, data);

              }).catch(error => {

             BuilderJsonresponse.Error(res, error);
          });


       }
    }
;

export default PeliculaFindByIdAction;
