import {Response} from "express";


import BuilderJsonresponse from "../../BuilderJsonResponse";
import {PeliculaModel} from "../../db/PeliculaModel";
import PeliculaFindByIdAction from "./PeliculaFindByIdAction";


const PeliculaUpdatedAction = {

      getListaCamposPermitidos: function () {
         return ['title', 'genre', 'plot'];
      },

      validarParams: function (id: string, dataUpdate: any): boolean {

         let isValid = PeliculaFindByIdAction.validarParams(id);

         //buscar si tenemos datos permitidos

         let contadorCampos = 0;
         this.getListaCamposPermitidos().forEach(c => {
            if (dataUpdate[c] !== undefined) {
               contadorCampos++;
            }
         });

         if (contadorCampos === 0) {
            //falta parametos
            isValid = false;
         }

         return isValid;
      },
      execute: function (res: Response, id: string, dataUpdate: any) {

         if (!this.validarParams(id, dataUpdate)) {
            BuilderJsonresponse.Error(res, "datos inválidos ");
            return;
         }

         //construir el object para update
         let dataUpdateValidado: any = {};

         this.getListaCamposPermitidos().forEach(c => {
            if (dataUpdate[c] !== undefined) {
               dataUpdateValidado[c] = dataUpdate[c];
            }
         });


         const promUpdate = PeliculaModel.findByIdAndUpdate(id, {$set: dataUpdateValidado} , {
            new: false,upsert: false
         });

         Promise.all([promUpdate])
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

export default PeliculaUpdatedAction;
