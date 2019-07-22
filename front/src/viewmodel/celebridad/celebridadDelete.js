import libRequestJson from "../../lib/libRequestJson";
import libToast from "../../lib/libToast";
import UrlApi from "../../UrlApi";




const celebridadDelete = {
  showForm(formDelete,celebridad) {
    formDelete.celebridad = celebridad;
    $("#modalDelete").modal();
  },
  exe(formCelebridad, lista) {

    if (formCelebridad.isEnProceso) {
      return;
    }

    formCelebridad.isEnProceso = true;

    let c = formCelebridad.celebridad;

    const fnSuccess = (payload) => {
      if (payload.success) {
        let index = lista
            .findIndex(item => {
                  return item._id === c._id;
                }
            );

        if (index > -1) {
          lista.splice(index, 1);
        }

        libToast.success("Registro eliminado " + c.name);

        $("#modalDelete").modal("hide");
        formCelebridad.isEnProceso = false;
      } else {
        libToast.alert(payload.msg);
      }
    };

    const fnError = (payload) => {
      libToast.alert("Error de servidor");
    };

    const url = UrlApi.Celebridades + '/' + formCelebridad.celebridad._id;
    libRequestJson.requestDELETE(url, fnError, fnSuccess);

  }
};

export default celebridadDelete;
