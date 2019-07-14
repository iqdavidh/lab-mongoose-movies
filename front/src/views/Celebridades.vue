<template>
  <div>

    <div class="row">
      <!-- name , ocupation, catchparase-->

      <div class="col-md-12">
        <table class="table table-condensed table-striped">
          <thead>
          <tr>
            <th style="width: 40px">#</th>
            <th>Name</th>
            <th>Occupation</th>
            <th>Catch Phrase</th>
            <th style="width: 40px"></th>
            <th style="width: 40px"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(c,index) in lista" :key="c._id">
            <td>{{index+1}}</td>
            <td>{{c.name}}</td>
            <td>{{c.occupation}}</td>
            <td>{{c.catchPhrase}}</td>
            <td><span class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></span></td>
            <td>
              <span class="btn btn-sm btn-danger"
                    title="Eliominar Registro"
                    @click="onShowFormDelete(c)">
                <i class="fa fa-trash"></i>
              </span>
            </td>
          </tr>
          </tbody>

        </table>

        <div v-if="isDebug">
          <div class="row">
            <div class="col-md-6">
              lista
              <pre>
                {{lista}}
              </pre>
            </div>
            <div class="col-md-6">
              formDelete.celebridad
              <pre>{{formDelete.celebridad}}</pre>
            </div>
          </div>

        </div>
      </div>


    </div>


    <!-- Modal -->
    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog"
         aria-hidden="true">
      <div class="modal-dialog bounceIn animated  " role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="fa fa-trash"></i> Eliminar Celebridad</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <small>Name:</small>
            <h4>{{formDelete.celebridad.name}}</h4>
            <small>ID</small>
            <p>{{formDelete.celebridad._id}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger"
                    @click="exeDelete"
            >
              <i class="fa fa-trash"></i> Eliminar
            </button>
            <button type="button" class="btn btn-secondary"
                    data-dismiss="modal">Cancelar
            </button>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import UrlApi from "../UrlApi";
  import libToast from "../lib/libToast";
  import libRequestJson from "../lib/libRequestJson";
  import libConfig from "../lib/libConfig";


  export default {
    name: 'Celebridades',
    props: {},
    data() {
      return {
        isDebug: libConfig.isDebug,
        pagina: 1,
        lista: [],
        next: '',
        total: 0,
        formDelete: {
          celebridad: {},
          isEnProceso: false
        }
      }
    },
    methods: {

      loadPagina(pagina) {
        this.pagina = pagina;

        const url = UrlApi.Celebridades + '/index/' + pagina.toString();

        const fnSuccess = (payload) => {

          if (payload.success) {

            this.lista = payload.data.items;
            this.next = payload.data.next;
            this.lista = payload.data.items;

            libToast.success("Celebridades Página " + pagina);

          } else {

            libToast.alert(payload.msg);
          }

        };

        const fnError = (error) => {
          libToast.alert(error);
        };

        libRequestJson.requestGET(url, fnError, fnSuccess);

      },
      onShowFormDelete(celebridad) {
        this.formDelete.celebridad = celebridad;
        $("#modalDelete").modal("show");
      },
      exeDelete() {
        let f = this.formDelete;
        let c = f.celebridad;

        if (f.isEnProceso) {
          return;
        }

        f.isEnProceso = true;
        const fnSuccess = (payload) => {
          if (payload.success) {
            let index= this.lista
                .findIndex(item => {
                      return item._id === c.id;
                    }
                );

            this.lista.splice(index,1);

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

    }, mounted() {


      this.loadPagina(1);


    }
  }
</script>


<style scoped>

</style>
