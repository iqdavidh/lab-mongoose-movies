<template>
  <div>

    <div class="row" style="margin-bottom: 10px">
      <div class="col-md-12">
        <span class="btn btn-primary" title="Agregar Celebridad" @click="onShowFormAdd">
        <i class="fa fa-plus"></i>
      </span>
      </div>
    </div>

    <div class="row">
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
          <tr v-show="formAdd.isShow" style="background-color: lightgoldenrodyellow">

            <td>New</td>

            <td :class="{'error':formAdd.error.name}">
              <div class="form-group">
                <input v-model="formAdd.data.name" class="form-control" required title="Nombre"/>
              </div>
            </td>

            <td :class="{'error':formAdd.error.occupation}">
              <div class="form-group">
                <input v-model="formAdd.data.occupation" class="form-control" required title="Ocupación"/>
              </div>
            </td>

            <td :class="{'error':formAdd.error.catchPhrase}">
              <div class="form-group">
                <input v-model="formAdd.data.catchPhrase" class="form-control" required title="Catch Phrase"/>
              </div>
            </td>

            <td>
                <span class="btn btn-sm btn-primary" title="Guardar"
                      @click="exeSaveAdd">
                  <i class="fa fa-upload"></i>
                </span>
            </td>

            <td>
               <span class="btn btn-sm btn-dark" title="Cancelar"
                     @click="cancelSaveAdd">
                  <i class="fa fa-times"></i>
                </span>
            </td>
          </tr>
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


  import libToast from "../lib/libToast";
  import libRequestJson from "../lib/libRequestJson";
  import libConfig from "../lib/libConfig";
  import UrlApi from "../UrlApi";
  import libValidacion from "../lib/libValidacion";
  import celebridadIndex from "../viewmodel/celebridad/celebridadIndex";
  import celebridadDelete from "../viewmodel/celebridad/celebridadDelete";
  import celebridadInsert from "../viewmodel/celebridad/celebridadInsert";


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
        },
        formAdd: {
          data: {name: '', occupation: '', catchPhrase: ''},
          error: {},
          isEnProceso: false,
          isShow: false
        }
      }
    },
    methods: {

      loadPagina(pagina) {
        this.pagina = pagina;
        celebridadIndex.loadPagina(pagina, this);
      },
      onShowFormDelete(celebridad) {
        this.formDelete.celebridad = celebridad;
        $("#modalDelete").modal("show");
      },
      exeDelete() {
        celebridadDelete.exe(this.formDelete, this.lista);
      },

      onShowFormAdd() {

        celebridadInsert.resetValorCampos(this.formAdd);

        this.formAdd.isEnProceso = false;
        this.formAdd.error = {};
        this.formAdd.isShow = true;
      },
      exeSaveAdd() {

        const fnAddNewToLista = (newCelebridad) => {
          this.addCelebridadToLista(newCelebridad);
        };

        celebridadInsert.exe(this.formAdd, fnAddNewToLista);

      },
      cancelSaveAdd() {
        this.formAdd.isShow = false;
      },
      exeSaveEdit() {

      },
      addCelebridadToLista(item) {
        this.lista.unshift(item);
      }


    }, mounted() {


      this.loadPagina(1);


    }
  }
</script>


<style scoped>

</style>
