import libRequestJson from "../../lib/libRequestJson";
import libToast from "../../lib/libToast";
import UrlApi from "../../UrlApi";




const celebridadDelete = {
  exe(f,lista) {

    let c = f.celebridad;

    if (f.isEnProceso) {
      return;
    }

    f.isEnProceso = true;
    const fnSuccess = (payload) => {
      if (payload.success) {
        let index = lista
            .findIndex(item => {
                  return item._id === c._id;
                }
            );

        if (index > 0) {
          lista.splice(index, 1);
        }

        libToast.success("Registro eliminado " + c.name);
        $("#modalDelete").modal("hide");

      } else {
        libToast.alert(payload.msg);
      }
    };

    const fnError = (payload) => {
      libToast.alert("Error de servidor");
    };

    const url = UrlApi.Celebridades + '/' + f.celebridad._id;
    libRequestJson.requestDELETE(url, fnError, fnSuccess);

  }
};

export default celebridadDelete;
