import UrlApi from "../../UrlApi";
import libRequestJson from "../../lib/libRequestJson";
import libToast from "../../lib/libToast";
import libValidacion from "../../lib/libValidacion";


const listaCampos = ['_id', 'name', 'occupation', 'catchPhrase'];
const listaCamposUpdate = listaCampos.filter(c => {
  return c !== '_id';
});


const celebridadUpdate = {
  showForm(formAdd, celebridad){

    listaCamposUpdate.forEach(c=>{
      formAdd.data[c]=celebridad[c];
    });

    celebridad.isEdit = true;

  },
  exe(formAdd, celebridad) {

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

        //const data = payload.data; no hay datos para actualizar

        listaCamposUpdate
            .forEach(c => {
              celebridad[c] = formAdd.data[c];

            });

        libToast.success("Registro modificado");
        formAdd.isEnProceso = true;
        celebridad.isEdit=false;

      } else {
        libToast.alert("Error " + payload.msg);
      }

    };

    let fnError = (response) => {
      libToast.alert("Error de Servidor" + response);
    };

    const url = UrlApi.Celebridades + `/${celebridad._id}`;


    let dataObject = JSON.parse(JSON.stringify(formAdd.data));


    libRequestJson.requestPUT(url, dataObject, fnError, fnSuccess);
  }

};


export default celebridadUpdate;
