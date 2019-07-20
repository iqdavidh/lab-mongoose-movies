import UrlApi from "../../UrlApi";
import libRequestJson from "../../lib/libRequestJson";
import libToast from "../../lib/libToast";
import libValidacion from "../../lib/libValidacion";


const listaCampos = ['_id', 'name', 'occupation', 'catchPhrase'];
const listaCamposUpdate = listaCampos.filter(c => {
  return c !== '_id';
});





const celebridadInsert = {
  exe(formAdd , fnAddCelebridad){

    if (formAdd.isEnProceso) {
      return;
    }

    formAdd.isEnProceso = true;


    let isValidacion = libValidacion.paramNotNull(formAdd.data, listaCamposUpdate, formAdd.error);


    if (!isValidacion) {
      formAdd.isEnProceso = false;
      libToast.alert("Datos incorrectos");
      return;
    }


    /*Proceder a guardar los datos */

    let fnSuccess = (payload) => {

      if (payload.success) {
        const data = payload.data;

        let newCelebridad = {};

        listaCampos.forEach(campo => {
          newCelebridad[campo] = formAdd.data[campo];
        });

        fnAddCelebridad(newCelebridad);

        libToast.success("Registro agregado");
        formAdd.isEnProceso = true;
        formAdd.isShow = false;

      } else {
        libToast.alert("Error " + payload.msg);
      }

    };

    let fnError = (response) => {
      libToast.alert("Error de Servidor");
    };

    const url = UrlApi.Celebridades;


    let dataObject = JSON.parse(JSON.stringify(formAdd.data));


    libRequestJson.requestPOST(url, dataObject, fnError, fnSuccess);
  },
  resetValorCampos(formAdd){
    listaCamposUpdate.forEach(c => {
      formAdd.data[c] = '';
    });
  }
};


export default celebridadInsert;
