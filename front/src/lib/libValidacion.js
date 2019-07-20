const libValidacion = {
  isNotNullOrEmty(valor) {
    return !(valor === null || valor === undefined || valor.toString().trim() === '');
  },
  paramNotNull(data, listaCampos, dataError) {

    let isValid = true;

    listaCampos.forEach(c => {
      if (!this.isNotNullOrEmty(data[c])) {
        dataError[c]=true;
        isValid=false
      }
    });

    return isValid;
  }
};

export default libValidacion;
