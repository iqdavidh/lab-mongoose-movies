import UrlApi from "../../UrlApi";
import libRequestJson from "../../lib/libRequestJson";
import libToast from "../../lib/libToast";

const celebridadIndex = {

  loadPagina(pagina, vm) {

    const url = UrlApi.Celebridades + '/index/' + pagina.toString();

    const fnSuccess = (payload) => {

      if (payload.success) {


        let lista = payload.data.items;
        lista.forEach(item => {
          item.isEdit = false;
        });
        vm.lista = lista;
        vm.next = payload.data.next;

        libToast.success("Celebridades Página " + pagina);

      } else {

        libToast.alert(payload.msg);
      }

    };

    const fnError = (error) => {
      libToast.alert(error);
    };

    libRequestJson.requestGET(url, fnError, fnSuccess);

  }
};

export default celebridadIndex;
