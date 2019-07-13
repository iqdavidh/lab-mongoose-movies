"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UrlApiConfig_1 = __importDefault(require("../../UrlApiConfig"));
const urlRel = UrlApiConfig_1.default.Celebridades;
const CelebridadIndexAction = {
    getUrl: function (texto, pagina) {
        return UrlApiConfig_1.default.urlApi + urlRel + `/${texto}/${pagina}`;
    },
    validarParams: function (texto, pagina) {
        // existe el parametro
        let isValid = !(texto === undefined || texto.trim() === '' || texto === null);
        if (isValid) {
            //tiene longitud correcta
            isValid = texto.length < 30;
        }
        if (isValid) {
            isValid = parseInt(pagina) > 0;
        }
        //TODO agrgar mensaje que describa el error de validacion
        return isValid;
    },
    execute: function (res, texto, pagina) {
        if (!this.validarParams(texto, pagina)) {
            SendRespuestaError(res, "Parámetro texto inválido");
            return;
        }
        texto = texto.toLowerCase();
        const numPagina = parseInt(pagina);
        SpotifiCX.buscarArtista(texto, numPagina)
            .then((data) => {
            const success = true;
            const msg = "";
            const total = data.artists.total;
            const paginaSiguiente = numPagina + 1;
            const next = data.artists.next === "" ? "" : urlApi + "/" + urlRel + `/${texto}/${paginaSiguiente}`;
            let d = {
                texto,
                next,
                total: data.artists.total,
                items: data.artists.items
            };
            res.json({ data: d, success, msg });
        })
            .catch((error) => {
            SendRespuestaError(res, error.message);
        });
    }
};
//# sourceMappingURL=CelebridadCrudaction.js.map
