import {Response} from "express";


import BuilderJsonresponse from "../../BuilderJsonResponse";
import {CelebridadModel} from "../../db/CelebridadModel";
import CelebridadFindByIdAction from "./CelebridadFindByIdAction";


const CelebridadInsertAction = {

      getListaCamposPermitidos: function () {
         return ['name', 'occupation', 'catchPhrase'];
      },

      validarParams: function (dataInsert: any): boolean {

         //buscar si tenemos datos permitidos

         let contadorCampos = 0;
         this.getListaCamposPermitidos().forEach(c => {
            if (dataInsert[c] !== undefined) {
               contadorCampos++;
            }
         });

         let isValid = true;

         if (contadorCampos === 0) {
            //falta parametos
            isValid = false;
         }

         return isValid;
      },
      execute: function (res: Response, dataInsert: any) {

         if (!this.validarParams(dataInsert)) {
            BuilderJsonresponse.Error(res, "datos inválidos ");
            return;
         }

         //construir el object para insert
         let dataInsertValidado: any = {};

         this.getListaCamposPermitidos().forEach(c => {
            if (dataInsert[c] !== undefined) {
               dataInsertValidado[c] = dataInsert[c];
            }
         });

         const promInsert = CelebridadModel.create(dataInsert);

         Promise.all([promInsert])
            .then((values) => {
               const item = values[0];

               let data: any = {
                  item:item
               };

               BuilderJsonresponse.Success(res, data);

            }).catch(error => {

            BuilderJsonresponse.Error(res, error);
         });
      }
   }
;

export default CelebridadInsertAction;
