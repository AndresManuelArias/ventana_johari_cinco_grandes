"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ventanaJohariRanda = __importStar(require("../logicaJohari/ventanaJohariRanda"));
const bigFive = __importStar(require("../bigFive/bigFive"));
class JohariBigfive {
    constructor(columnasAnalizar, tablaPuntajes, escalaPuntaje, operacion) {
        this.ventanaJohariRanda = new ventanaJohariRanda.VentanaJohariRanda(columnasAnalizar);
        this.bigFive = new bigFive.BigFive(tablaPuntajes, escalaPuntaje, operacion);
    }
    analizar(table) {
        let resultado = this.ventanaJohariRanda.analizar(table);
        return resultado.map((entorno) => {
            entorno['personas_entorno'] = entorno['personas_entorno'].map((personas_entorno) => {
                personas_entorno['ventana de johari'].zonaAbierta = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaAbierta);
                personas_entorno['ventana de johari'].zonaCiega = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaCiega);
                personas_entorno['ventana de johari'].zonaOculta = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaOculta);
                personas_entorno['ventana de johari'].zonaDesconocida = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaDesconocida);
                personas_entorno['opinion propia'] = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['opinion propia']);
                personas_entorno['opinion otros'] = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['opinion otros']);
                return personas_entorno;
            });
            return entorno;
        });
    }
}
exports.JohariBigfive = JohariBigfive;
