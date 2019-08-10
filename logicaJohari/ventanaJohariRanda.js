"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = __importStar(require("ramda"));
function calificadoresIguales(baseDeDatos, columnaEvaluador, columnaEvaluado) {
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] === calificacion[columnaEvaluado]);
}
function buscarOpinionesOtrosDeEsteEvaluado(baseDeDatos, nombreEvaluado, columnaEvaluado) {
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluado] === nombreEvaluado);
}
function calificadoresDistintos(baseDeDatos, columnaEvaluador, columnaEvaluado) {
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] !== calificacion[columnaEvaluado]);
}
const criterioUnionPropiedadesIguales = (key, l, dato) => R.type(l) === "Array" ? l.concat(dato) : [l].concat(dato);
const generarUnion = R.mergeDeepWithKey(criterioUnionPropiedadesIguales);
function generarVentanaPersona(opinionPropiaUsuario, opinionOtrosUsuario) {
    let zonas = {
        zonaAbierta: new Map(),
        zonaCiega: new Map(),
        zonaOculta: new Map(),
        zonaDesconocida: new Map()
    };
    let coleccionador = opinionOtrosUsuario;
    console.log('coleccionador', coleccionador);
    // console.log('opinionPropiaUsuario',opinionPropiaUsuario)   
    const calificacion = new Set(Object.keys(coleccionador).concat(Object.keys(opinionPropiaUsuario))); // esto es para unir las llaves de los dos array y no queden repetidas   
    // console.log('calificacion',calificacion)
    for (let key of calificacion) {
        let k = key;
        let suma = coleccionador[k] == undefined ? 0 : R.sum([coleccionador[k]].flat());
        if (suma && opinionPropiaUsuario[k]) { //si el usuario a puntuado esa caracteristica y al ser sumado tambien se a puntuado
            zonas.zonaAbierta.set(k, [coleccionador[k]].flat().concat(opinionPropiaUsuario[k]));
        }
        else if (!suma && opinionPropiaUsuario[k]) { //El usuario lo puntuo pero el grupo no lo a puntado
            zonas.zonaOculta.set(k, [opinionPropiaUsuario[k]]);
        }
        else if (suma && !opinionPropiaUsuario[k]) { // El grupo lo puntuo pero el usuario no
            zonas.zonaCiega.set(k, [coleccionador[k]].flat());
        }
        else { // ni el grupo ni la person lo puntua
            zonas.zonaDesconocida.set(k, coleccionador[k] == undefined ? [opinionPropiaUsuario[k]] : [coleccionador[k]].flat().concat(opinionPropiaUsuario[k] || []));
        }
    }
    return zonas;
}
exports.generarVentanaPersona = generarVentanaPersona;
function convertirVentanaJohariJson(zonas) {
    let ventanaJson = {};
    for (let key in zonas) {
        ventanaJson[key] = {};
        zonas[key].forEach((element, index) => {
            ventanaJson[key][index] = element;
        });
    }
    return ventanaJson;
}
function seleccionarEntornos(dataTable, columnaEntorno) {
    let entornos = new Map();
    dataTable.forEach((fila) => {
        if (entornos.has(fila[columnaEntorno])) {
            entornos.get(fila[columnaEntorno]).push(fila);
        }
        else {
            entornos.set(fila[columnaEntorno], [fila]);
        }
    });
    return entornos;
}
exports.seleccionarEntornos = seleccionarEntornos;
function columnasSeleccionar(columnasAnalizar) {
    return R.pick(columnasAnalizar.definirColumnasCalificaciones);
}
exports.columnasSeleccionar = columnasSeleccionar;
function mostrarOpinionOtros(calificacionesEvaluado, columnasAnalizar) {
    let opinionOtros = calificadoresDistintos(calificacionesEvaluado, columnasAnalizar.definirColumnaEvaluador, columnasAnalizar.definirColumnaEvaluado);
    let functionopinionOtros = R.pick(columnasAnalizar.definirColumnasCalificaciones);
    let finOpinionOtros = opinionOtros.map((filaOpinionOtro) => functionopinionOtros(filaOpinionOtro));
    console.log('finOpinionOtros', finOpinionOtros);
    if (finOpinionOtros.length) {
        return finOpinionOtros.reduce((valorAntes, valorDespues) => generarUnion(valorAntes, valorDespues));
    }
    else {
        return finOpinionOtros;
    }
}
exports.mostrarOpinionOtros = mostrarOpinionOtros;
function convertirPropiedadesEnArray(fila) {
    let convertido = {};
    for (let key in fila) {
        convertido[key] = [fila[key]].flat();
    }
    return convertido;
}
function clasificar(dataEntorno, columnasAnalizar, nombreEntornoIndex) {
    let construccionData = { "personas_entorno": [], "nombre_entorno": "" };
    // console.log('dataEntorno',dataEntorno)
    construccionData["nombre_entorno"] = nombreEntornoIndex;
    // calificadoresIguales(dataEntorno,columnasAnalizar.definirColumnaEvaluador,columnasAnalizar.definirColumnaEvaluado)
    seleccionarEntornos(dataEntorno, 'evaluado')
        .forEach((calificacionesEvaluado, nombreUsuario) => {
        // console.log('calificacionesEvaluado',calificacionesEvaluado)
        // console.log(calificacionesEvaluado[columnasAnalizar.definirColumnaEvaluado],columnasAnalizar.definirColumnaEvaluado)
        // console.log('calificacionDistintas',calificacionDistintas)
        let opinionOtrosUnido = mostrarOpinionOtros(calificacionesEvaluado, columnasAnalizar);
        console.log('opinionOtrosUnido', opinionOtrosUnido);
        let opinionOtrosUnidoConvertPropiedadesArray = convertirPropiedadesEnArray(opinionOtrosUnido);
        let usuarioDatos = calificadoresIguales(calificacionesEvaluado, columnasAnalizar.definirColumnaEvaluador, columnasAnalizar.definirColumnaEvaluado);
        console.log('usuarioDatos', usuarioDatos);
        let Rusuario = usuarioDatos.length ? R.pick(columnasAnalizar.definirColumnasCalificaciones, usuarioDatos[0]) : usuarioDatos;
        console.log('Rusuario', Rusuario);
        let RusuarioConvertArrayPropiedades = convertirPropiedadesEnArray(Rusuario);
        let ventanajohariUsuario = {
            "nombre usuario": nombreUsuario,
            "ventana de johari": convertirVentanaJohariJson(generarVentanaPersona(Rusuario, opinionOtrosUnidoConvertPropiedadesArray)),
            "opinion propia": RusuarioConvertArrayPropiedades,
            "opinion otros": opinionOtrosUnidoConvertPropiedadesArray
        };
        construccionData["personas_entorno"].push(ventanajohariUsuario);
    });
    return construccionData;
}
class VentanaJohariRanda {
    constructor(columnasAnalizar) {
        this.columnasAnalizar = columnasAnalizar;
    }
    analizar(dataTable) {
        let columnasAnalizar = this.columnasAnalizar;
        let columnaEntorno = this.columnasAnalizar.definirColumnaEntorno;
        let entornos = seleccionarEntornos(dataTable, columnaEntorno);
        this.entornos = entornos;
        let coleccionEntornos = [];
        entornos.forEach((dataEntorno, nombreEntornoIndex) => {
            let construccionData = clasificar(dataEntorno, columnasAnalizar, nombreEntornoIndex);
            coleccionEntornos.push(construccionData);
        });
        return coleccionEntornos;
    }
    getEntornos() {
        return this.entornos;
    }
}
exports.VentanaJohariRanda = VentanaJohariRanda;
