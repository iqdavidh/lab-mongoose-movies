const libRequestJson = {

  requestGET: () => {

    fetch(url, {
          mode: 'cors',
          method: 'GET',
          headers: {
            "Accept": "application/json",
            'Content-Type': "application/json"
          }
        }
    )
        .then((response) => {
          return response.json();
        })
        .then((payload) => {

          if (payload.success === true) {
            //aqui ya podemos validar si hya un acceso

          } else {
            alert(payload.msg);
          }
        }).catch(error => {
      alert(error);
    })
  }
};


export default libRequestJson;
