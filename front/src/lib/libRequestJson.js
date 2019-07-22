import libConfig from "./libConfig";

const libRequestJson = {

  requestGET: (url, fnError, fnSuccess) => {

    const isDebug = libConfig.isDebug;

    if (isDebug) {
      console.log(url);
    }


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

          if (isDebug) {
            console.log(payload);
          }

          fnSuccess(payload);

        })
        .catch(error => {
              if (isDebug) {
                console.log(error);
              }
              fnError(error);
            }
        )
  },

  requestPOST: (url, dataObject, fnError, fnSuccess) => {

    const isDebug = libConfig.isDebug;

    if (isDebug) {
      console.log(url);
    }


    fetch(url, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataObject)
        }
    )
        .then((response) => {
          return response.json();
        })
        .then((payload) => {

          if (isDebug) {
            console.log(payload);
          }

          fnSuccess(payload);

        })
        .catch(error => {
              if (isDebug) {
                console.log(error);
              }
              fnError(error);
            }
        )
  },
  requestDELETE: (url, fnError, fnSuccess) => {

    const isDebug = libConfig.isDebug;

    if (isDebug) {
      console.log(url);
    }


    fetch(url, {
          mode: 'cors',
          method: 'DELETE',
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

          if (isDebug) {
            console.log(payload);
          }

          fnSuccess(payload);

        })
        .catch(error => {
              if (isDebug) {
                console.log(error);
              }
              fnError(error);
            }
        )
  },
  requestPUT: (url, dataObject, fnError, fnSuccess) => {

    const isDebug = libConfig.isDebug;

    if (isDebug) {
      console.log(url);
    }


    fetch(url, {
          mode: 'cors',
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataObject)
        }
    )
        .then((response) => {
          return response.json();
        })
        .then((payload) => {

          if (isDebug) {
            console.log(payload);
          }

          fnSuccess(payload);

        })
        .catch(error => {
              if (isDebug) {
                console.log(error);
              }
              fnError(error);
            }
        )
  }
};


export default libRequestJson;
