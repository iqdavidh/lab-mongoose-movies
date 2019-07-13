const fs = require("fs");

module.exports = {

  saveResponse(texto, nombreArchivo) {

    fs.writeFile("./test/response/" + nombreArchivo, texto, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  },

  getRandom() {
    const min = 0;
    const max = 1000;
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }
};




