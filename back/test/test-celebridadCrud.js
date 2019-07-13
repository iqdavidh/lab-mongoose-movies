
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

let url="http://localhost:3002";

const request = supertest(url);


describe('get /api/celebridades', function () {
  it('ok request', function (done) {

    request
        .get('/api/celebridades')
        .expect(200)
        .end(function (err, res) {

          saveResponse(  JSON.stringify(res), 'celebridades.json');

          const c = JSON.parse(res.text);

          saveResponse(res.text, 'celebridades.json');

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

})
;
