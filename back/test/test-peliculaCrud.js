const supertest = require('supertest');
const assert = require('assert');
const lib = require('./lib');

let url = "http://localhost:3002";

const request = supertest(url);


describe('index get /api/peliculas/index', function () {
  it('ok request get index', function (done) {
    request
        .get('/api/peliculas/index/1')
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          lib.saveResponse(res.text, 'peliculas-index.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let dataRespuesta = c.data;

          //assert(dataRespuesta.next !== "", "next vacio");
          assert(dataRespuesta.total > 0, "no tiene items");

          assert(typeof dataRespuesta.items === "object", "se esperaba un tipo objecto");

          assert(dataRespuesta.items.length > 0, "no hay items");

          if (err) return done(err);
          done();
        })
    ;
  });

});


describe('get /api/peliculas/', function () {
  it('ok request get item', function (done) {
    request
        .get('/api/peliculas/5d2956bbf82a26aff127ce7d')
        .expect(200)
        .end(function (err, res) {

          lib.saveResponse(JSON.stringify(res), 'peliculas-item.json');

          const c = JSON.parse(res.text);

          lib.saveResponse(res.text, 'peliculas-item.json');

          assert(c.success, "Se esperada true como tipo de succes");
          assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let dataRespuesta = c.data;


          assert(dataRespuesta.item._id === "5d2956bbf82a26aff127ce7d", 'id incorrecto');
          assert(dataRespuesta.item.title, "no tiene title");
          assert(dataRespuesta.item.genre, "no tiene genre");
          assert(dataRespuesta.item.plot, "no tiene plot");


          if (err) return done(err);
          done();
        })
    ;
  });
});


describe('put /api/peliculas/', function () {
  it('ok request put item', function (done) {

    const valorRandom = lib.getRandom();
    const dataUpdate = {plot: 'plot-test ' + valorRandom.toString()};


    request
        .put('/api/peliculas/5d2956bbf82a26aff127ce7d')
        .set('Accept', 'application/json')
        .send(dataUpdate)
        .expect(200)
        .end(function (err, res) {

          lib.saveResponse(JSON.stringify(res), 'peliculas-item-res-put.json');

          const c = JSON.parse(res.text);

          assert(c.success, "Se esperada true como tipo de succes");
          assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let dataRespuesta = c.data;

          assert(dataRespuesta.id === "5d2956bbf82a26aff127ce7d", 'id incorrecto');


          if (err) return done(err);
          done();
        })
    ;
  });
});


describe('post/delete /api/peliculas/', function () {
  it('ok request post item', function (done) {

    const valorRandom = lib.getRandom();
    const dataInsert = {
      title: 'title insert-test ' + valorRandom.toString(),
      genre: "genre peli",
      plot: "plot peli"
    };


    function testDelete(id) {
      request
          .delete('/api/peliculas/' + id)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {

            lib.saveResponse(JSON.stringify(res), 'peliculas-item-res-delete.json');

            const c = JSON.parse(res.text);

            lib.saveResponse(res.text, 'peliculas-item-delete.json');

            assert(c.success, "Se esperada true como tipo de success");
            assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

            assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

            let dataRespuesta = c.data;

            assert(dataRespuesta.id, 'no esta el id');

            if (err) return done(err);
            done();
          })
      ;
    }

    request
        .post('/api/peliculas')
        .set('Accept', 'application/json')
        .send(dataInsert)
        .expect(200)
        .end(function (err, res) {

          lib.saveResponse(JSON.stringify(res), 'peliculas-item-res-post.json');

          const c = JSON.parse(res.text);

          lib.saveResponse(res.text, 'peliculas-item-post.json');

          assert(c.success, "Se esperada true como tipo de succes");
          assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let dataRespuesta = c.data;

          assert(dataRespuesta.item, 'no esta el item');

          let id = dataRespuesta.item._id;
          testDelete(id);


        })
    ;
  });
});


