<template>
  <div>

    <div class="row">
      <div class="col-xs-12 col-md-6">

        <img
            src="https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png"/>


      </div>
      <div class="col-xs-12 col-md-6">
        <h3 style="margin-bottom: 30px">Mongoose Movies</h3>
        <p>@iqdavidh</p>
        <p>Julio 2019</p>
        <br>
        <span>Backend</span><br>
        <span class="badge badge-success">{{urlApiBase}}</span>
      </div>
    </div>


  </div>
</template>

<script>

  import UrlApi from "../UrlApi";

  const urlBase= UrlApi.APi;

  export default {
    name: 'Home',
    props: {},
    data(){
      return {
        urlApiBase:urlBase,
      }
    }
  }
</script>


<style scoped>

</style>
