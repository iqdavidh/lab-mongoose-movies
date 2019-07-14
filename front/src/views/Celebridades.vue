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
          </tr>
          </thead>
          <tbody>
          <tr v-for="(c,index) in lista" :key="c._id">
            <td :title="ID">{{index+1}}</td>
            <td>{{c.name}}</td>
            <td>{{c.occupation}}</td>
            <td>{{c.catchPhrase}}</td>
          </tr>
          </tbody>

        </table>
      </div>


    </div>

  </div>
</template>

<script>

  import UrlApi from "../UrlApi";
  import libToast from "../lib/libToast";
  import libRequestJson from "../lib/libRequestJson";

  const urlCelebridades = UrlApi.Celebridades;


  export default {
    name: 'Celebridades',
    props: {},
    data() {
      return {
        urlCelebridades,
        pagina: 1,
        lista: [],
        next: '',
        total: 0
      }
    },
    methods: {

      loadPagina(pagina) {
        this.pagina = pagina;

        const url = urlCelebridades + '/index/' + pagina.toString();

        const fnSuccess = (payload) => {

          if (payload.success) {

            this.lista = payload.data.items;
            this.next = payload.data.next;
            this.lista = payload.data.items;

            libToast.success(payload.msg);

          } else {

            libToast.alert(payload.msg);
          }

        };

        const fnError=(error)=>{
          libToast.alert(error);
        };

        libRequestJson.requestGET(url,fnError,fnSuccess);

      }
    }, mounted() {


      this.loadPagina(1);


    }
  }
</script>


<style scoped>

</style>
