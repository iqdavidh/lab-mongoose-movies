import {Response} from "express";


import BuilderJsonresponse from "../../BuilderJsonResponse";
import {PeliculaModel} from "../../db/PeliculaModel";
import PeliculaFindByIdAction from "./PeliculaFindByIdAction";


const PeliculaDeleteAction = {

      validarParams: function (id: string): boolean {
         let isValid = PeliculaFindByIdAction.validarParams(id);

         return isValid;
      },
      execute: function (res: Response, id: string) {

         if (!this.validarParams(id)) {
            BuilderJsonresponse.Error(res, "datos inválidos ");
            return;
         }


         const promDelete = PeliculaModel.findByIdAndDelete(id);

         Promise.all([promDelete])
            .then((values) => {
               const item = values[0];

               let data: any = {
                  id
               };

               BuilderJsonresponse.Success(res, data);

            }).catch(error => {

            BuilderJsonresponse.Error(res, error);
         });


      }
   }
;

export default PeliculaDeleteAction;
