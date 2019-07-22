import UrlApi from "../../UrlApi";
import libRequestJson from "../../lib/libRequestJson";
import libToast from "../../lib/libToast";
import libValidacion from "../../lib/libValidacion";


const listaCampos = ['_id', 'name', 'occupation', 'catchPhrase'];
const listaCamposUpdate = listaCampos.filter(c => {
  return c !== '_id';
});





const celebridadInsert = {
  exe(formCelebridad , fnAddCelebridad){

    if (formCelebridad.isEnProceso) {
      return;
    }

    formCelebridad.isEnProceso = true;


    let isValidacion = libValidacion.paramNotNull(formCelebridad.data, listaCamposUpdate, formCelebridad.error);


    if (!isValidacion) {
      formCelebridad.isEnProceso = false;
      libToast.alert("Datos incorrectos");
      return;
    }


    /*Proceder a guardar los datos */

    let fnSuccess = (payload) => {

      if (payload.success) {
        const data = payload.data;

        let newCelebridad = {};

        listaCampos.forEach(campo => {
          newCelebridad[campo] = formCelebridad.data[campo];
        });

        fnAddCelebridad(newCelebridad);

        libToast.success("Registro agregado");
        formCelebridad.isEnProceso = true;
        formCelebridad.isShow = false;

      } else {
        libToast.alert("Error " + payload.msg);
      }

    };

    let fnError = (response) => {
      libToast.alert("Error de Servidor");
    };

    const url = UrlApi.Celebridades;


    let dataObject = JSON.parse(JSON.stringify(formCelebridad.data));


    libRequestJson.requestPOST(url, dataObject, fnError, fnSuccess);
  },
  resetValorCampos(formCelebridad){
    listaCamposUpdate.forEach(c => {
      formCelebridad.data[c] = '';
    });
  }
};


export default celebridadInsert;
