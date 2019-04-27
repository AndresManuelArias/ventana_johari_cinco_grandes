"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require('ramda');
function calificadoresIguales(baseDeDatos, columnaEvaluador, columnaEvaluado) {
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] === calificacion[columnaEvaluado]);
}
function buscarOpinionesOtrosDeEsteEvaluado(baseDeDatos, nombreEvaluado, columnaEvaluado) {
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluado] === nombreEvaluado);
}
function calificadoresDistintos(baseDeDatos, columnaEvaluador, columnaEvaluado) {
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] !== calificacion[columnaEvaluado]);
}
function generarVentanaPersona(opinionPropiaUsuario, opinionOtrosUsuario) {
    let zonas = {
        zonaAbierta: new Map(),
        zonaCiega: new Map(),
        zonaOculta: new Map(),
        zonaDesconocida: new Map()
    };
    let criterio = (k, l, r) => R.type(l) === "Array" ? l.concat(r) : [l].concat(r);
    let generarUnion = R.mergeDeepWithKey(criterio);
    let coleccionador = {};
    opinionOtrosUsuario.forEach((values) => {
        coleccionador = generarUnion(coleccionador, values);
    });
    console.log('coleccionador', coleccionador);
    for (let key in coleccionador) {
        let suma = R.sum(coleccionador[key]);
        if (suma && opinionPropiaUsuario[key]) { //si el usuario a puntuado esa caracteristica y al ser sumado tambien se a puntuado
            zonas.zonaAbierta.set(key, coleccionador[key].concat(opinionPropiaUsuario[key]));
        }
        else if (!suma && opinionPropiaUsuario[key]) { //El usuario lo puntuo pero el grupo no lo a puntado
            zonas.zonaOculta.set(key, opinionPropiaUsuario[key]);
        }
        else if (suma && !opinionPropiaUsuario[key]) { // El grupo lo puntuo pero el usuario no
            zonas.zonaCiega.set(key, coleccionador[key]);
        }
        else { // ni el grupo ni la person lo puntua
            zonas.zonaDesconocida.set(key, coleccionador[key].concat(opinionPropiaUsuario[key]));
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
function clasificar(dataEntorno, columnasAnalisar, nombreEntornoIndex) {
    let construccionData = { "personas_entorno": [], "nombre_entorno": "" };
    // console.log('dataEntorno',dataEntorno)
    let calificacionDistintas = calificadoresDistintos(dataEntorno, columnasAnalisar.definirColumnaEvaluador, columnasAnalisar.definirColumnaEvaluado);
    // // console.log('calificacionDistintas',calificacionDistintas)
    construccionData["nombre_entorno"] = nombreEntornoIndex;
    calificadoresIguales(dataEntorno, columnasAnalisar.definirColumnaEvaluador, columnasAnalisar.definirColumnaEvaluado).forEach((usuario) => {
        // console.log(usuario[columnasAnalisar.definirColumnaEvaluado],columnasAnalisar.definirColumnaEvaluado)
        let functionopinionOtros = R.pick(columnasAnalisar.definirColumnasCalificaciones);
        let opinionOtros = buscarOpinionesOtrosDeEsteEvaluado(calificacionDistintas, usuario[columnasAnalisar.definirColumnaEvaluado], columnasAnalisar.definirColumnaEvaluado);
        let finOpinionOtros = opinionOtros
            .map((filaOpinionOtro) => functionopinionOtros(filaOpinionOtro));
        // console.log('finOpinionOtros',finOpinionOtros)
        let Rusuario = R.pick(columnasAnalisar.definirColumnasCalificaciones, usuario);
        let ventanajohariUsuario = {
            "nombre usuario": usuario[columnasAnalisar.definirColumnaEvaluado],
            "ventana de johari": convertirVentanaJohariJson(generarVentanaPersona(Rusuario, finOpinionOtros)),
            "opinion propia": Rusuario,
            "opinion otros": finOpinionOtros
        };
        construccionData["personas_entorno"].push(ventanajohariUsuario);
    });
    return construccionData;
}
class VentanaJohariRanda {
    constructor(columnasAnalisar) {
        this.columnasAnalisar = columnasAnalisar;
    }
    analisar(dataTable) {
        let columnasAnalisar = this.columnasAnalisar;
        let columnaEntorno = this.columnasAnalisar.definirColumnaEntorno;
        let entornos = seleccionarEntornos(dataTable, columnaEntorno);
        this.entornos = entornos;
        let coleccionEntornos = [];
        entornos.forEach((dataEntorno, nombreEntornoIndex) => {
            let construccionData = clasificar(dataEntorno, columnasAnalisar, nombreEntornoIndex);
            coleccionEntornos.push(construccionData);
        });
        return coleccionEntornos;
    }
    getEntornos() {
        return this.entornos;
    }
}
exports.VentanaJohariRanda = VentanaJohariRanda;
