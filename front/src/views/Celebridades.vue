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
            <tr>
              <td></td>
            </tr>
          </tbody>

        </table>
      </div>


{{urlCelebridades}}

    </div>

  </div>
</template>

<script>

  import UrlApi from "../UrlApi";
  import libToast from "../lib/libToast";

  let urlCelebridades = UrlApi.Celebridades;

  export default {
    name: 'Celebridades',
    props: {},
    data(){
      return{
        urlCelebridades
      }
    },
    methods:{

    },mounted() {
      libToast.info("Datos Loaded");
    }
  }
</script>


<style scoped>

</style>
