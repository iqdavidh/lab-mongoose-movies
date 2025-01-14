const supertest = require('supertest');
const assert = require('assert');
const lib = require('./lib');

let url = "http://localhost:3002";

const request = supertest(url);


describe('index get /api/celebridades/index', function () {
  it('ok request get index', function (done) {
    request
        .get('/api/celebridades/index/1')
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          lib.saveResponse(res.text, 'celebridades-index.json');

          assert(c.success, "Se esperada true como tipo de succes");
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


describe('get /api/celebridades/', function () {
  it('ok request get item', function (done) {
    request
        .get('/api/celebridades/5d2925c9f82a26aff127b1f4')
        .expect(200)
        .end(function (err, res) {

          lib.saveResponse(JSON.stringify(res), 'celebridades-item.json');

          const c = JSON.parse(res.text);

          lib.saveResponse(res.text, 'celebridades-item.json');

          assert(c.success, "Se esperada true como tipo de succes");
          assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let dataRespuesta = c.data;


          assert(dataRespuesta.item._id === "5d2925c9f82a26aff127b1f4", 'id incorrecto');
          assert(dataRespuesta.item.name, "no tiene name");
          assert(dataRespuesta.item.occupation, "no tiene ocupation");
          assert(dataRespuesta.item.catchPhrase, "no tiene catchPhrase");


          if (err) return done(err);
          done();
        })
    ;
  });
});


describe('put /api/celebridades/', function () {
  it('ok request put item', function (done) {

    const valorRandom = lib.getRandom();
    const dataUpdate = {occupation: 'ocupacion-test ' + valorRandom.toString()};


    request
        .put('/api/celebridades/5d2925c9f82a26aff127b1f4')
        .set('Accept', 'application/json')
        .send(dataUpdate)
        .expect(200)
        .end(function (err, res) {

          lib.saveResponse(JSON.stringify(res), 'celebridades-item-res-put.json');

          const c = JSON.parse(res.text);

          assert(c.success, "Se esperada true como tipo de succes");
          assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let dataRespuesta = c.data;

          assert(dataRespuesta.id === "5d2925c9f82a26aff127b1f4", 'id incorrecto');


          if (err) return done(err);
          done();
        })
    ;
  });
});


describe('post/delete /api/celebridades/', function () {
  it('ok request post item', function (done) {

    const valorRandom = lib.getRandom();
    const dataInsert = {
      occupation: 'ocupacion insert-test ' + valorRandom.toString(),
      name: "nombre celeb",
      catchPhrase: "catchPhrase celeb"
    };


    function testDelete(id) {
      request
          .delete('/api/celebridades/' + id)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {

            lib.saveResponse(JSON.stringify(res), 'celebridades-item-res-delete.json');

            const c = JSON.parse(res.text);

            lib.saveResponse(res.text, 'celebridades-item-delete.json');

            assert(c.success, "Se esperada true como tipo de succes");
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
        .post('/api/celebridades')
        .set('Accept', 'application/json')
        .send(dataInsert)
        .expect(200)
        .end(function (err, res) {

          lib.saveResponse(JSON.stringify(res), 'celebridades-item-res-post.json');

          const c = JSON.parse(res.text);

          lib.saveResponse(res.text, 'celebridades-item-post.json');

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


