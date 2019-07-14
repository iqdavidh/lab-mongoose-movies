const libToast = {
  base(clase, msg) {
    Toastify({
      text: msg,
      className: clase,
    }).showToast();

  },
  success(msg) {
    this.base('success', msg);
  },
  info(msg){
    this.base( 'info',msg);
  },
  alert(msg){
    this.base( 'alert',msg);
  }
};


export default libToast;
