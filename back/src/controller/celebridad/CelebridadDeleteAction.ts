import {Response} from "express";


import BuilderJsonresponse from "../../BuilderJsonResponse";
import {CelebridadModel} from "../../db/CelebridadModel";
import CelebridadFindByIdAction from "./CelebridadFindByIdAction";


const CelebridadDeleteAction = {

      validarParams: function (id: string): boolean {
         let isValid = CelebridadFindByIdAction.validarParams(id);

         return isValid;
      },
      execute: function (res: Response, id: string) {

         if (!this.validarParams(id)) {
            BuilderJsonresponse.Error(res, "datos inválidos ");
            return;
         }


         const promDelete = CelebridadModel.findByIdAndDelete(id);

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

export default CelebridadDeleteAction;
