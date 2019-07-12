import ServerConfig from "../src/Config";

const fs = require("fs");
const supertest = require('supertest');
const assert = require('assert');


function saveResponse(texto, nombreArchivo) {

  fs.writeFile("./test/response/" + nombreArchivo, texto, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

let url=ServerConfig.urlApi;

const request = supertest(url);


describe('get /api/celebridad', function () {
  it('ok request', function (done) {

    request
        .get('/api/celebridad')
        .expect(200)
        .end(function (err, res) {

          saveResponse(  JSON.stringify(res), 'celebridad.json');

          const c = JSON.parse(res.text);

          saveResponse(res.text, 'celebridad.json');

          assert(c.success, "Se esperada true como tipo de succes");
          assert(c.msg === "", "No deberiamos tener un mensaje de en la respuesta");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let dataRespuesta = c.data;

          assert(dataRespuesta.next === "http://localhost:3002/api/", "next incorrecto");
          assert(dataRespuesta.total > 0, "items totales  incorrectos");

          assert(typeof dataRespuesta.items === "object", "se esperaba un tipo objecto");

          assert(dataRespuesta.items.length > 0, "items totales  incorrectos");

          if (err) return done(err);
          done();
        })
    ;

  });

})
;
