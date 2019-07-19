"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// este solo recive los adjetivos
const R = require('ramda');
var jStat = require('jStat').jStat;
function darPeso(puntaje, asignacionPuntaje, escalaPuntaje) {
    return puntaje * asignacionPuntaje;
}
function inversionPuntaje(puntaje, asignacionPuntaje, escalaPuntaje) {
    let puntajeFinal = puntaje * Math.abs(asignacionPuntaje); // el problema de esta formula es que aumenta la diferencia entre numeros pequeños y los numeros grandes
    if (asignacionPuntaje < 0 && puntaje >= escalaPuntaje.min) {
        // console.log('resta puntaje',escalaPuntaje.max - puntajeFinal)
        // asignacionPuntaje = 1 -Math.abs(asignacionPuntaje)
        puntajeFinal = escalaPuntaje.max - puntajeFinal;
    }
    // console.log('multiplicacion puntaje',escalaPuntaje.max - puntaje)
    return puntajeFinal;
}
function sacarPuntajeBigFive(puntajesPersona, tablaPuntajes, escalaPuntaje, operacion) {
    let scoreBigfive = new Map();
    tablaPuntajes.forEach((fila) => {
        console.log(fila["Adjetivo"]);
        if (puntajesPersona[fila["Adjetivo"]]) { // en un futuro el promedio puede ser una Media Aritmética Ponderada, donde se le da mas peso a la calificacion realizada por un psicologo
            let puntajeMean = operacion == undefined ? JSON.parse(`{"${fila["Adjetivo"]}":[${puntajesPersona[fila["Adjetivo"]]}]}`) : Array.isArray(puntajesPersona[fila["Adjetivo"]]) ? jStat[operacion == undefined ? 'mean' : operacion.dominio](puntajesPersona[fila["Adjetivo"]]) : puntajesPersona[fila["Adjetivo"]]; // se verifica la calificacion de cada adjetivo y se saca un promedio si esta es mayor a uno
            console.log('puntajeMean', puntajeMean);
            let bigFive = ["amabilidad",
                "neuroticismo",
                "extraversión",
                "responsabilidad",
                "apertura"];
            bigFive.forEach(factor => {
                if (scoreBigfive.has(factor)) { //una coleccion que tiene valor de 0, es por que ese abjetivo tiene un valor de cero en un factor pero no en otros factores
                    let puntajeFactor = Number(fila[factor]);
                    // console.log('puntajeMean',puntajeMean,'Adjetivo',fila["Adjetivo"],'inversionPuntaje',puntajeFactor,'fila[factor]',fila[factor],factor,inversionPuntaje( puntajeMean,puntajeFactor,escalaPuntaje))
                    scoreBigfive.get(factor).push(operacion == undefined ? puntajeMean : darPeso(puntajeMean, puntajeFactor, escalaPuntaje));
                }
                else {
                    scoreBigfive.set(factor, [operacion == undefined ? puntajeMean : darPeso(puntajeMean, fila[factor], escalaPuntaje)]);
                }
            });
        }
    });
    console.log('operacion', operacion);
    if (operacion !== undefined && operacion.rango !== undefined) {
        scoreBigfive.forEach((factores, key) => {
            scoreBigfive.set(key, jStat[operacion.rango](factores));
        });
        console.log('scoreBigfive operacion', scoreBigfive);
    }
    return scoreBigfive;
}
function convertirPuntajeBigFiveInJson(resultadoBigFive) {
    let bigFiveJson = {
        "amabilidad": null,
        "neuroticismo": null,
        "extraversión": null,
        "responsabilidad": null,
        "apertura": null
    };
    for (var [clave, valor] of resultadoBigFive) {
        bigFiveJson[clave] = valor;
    }
    return bigFiveJson;
}
exports.convertirPuntajeBigFiveInJson = convertirPuntajeBigFiveInJson;
function sacarPuntajeBigFiveJson(puntajesPersona, tablaPuntajes, escalaPuntaje, operacion) {
    return convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(puntajesPersona, tablaPuntajes, escalaPuntaje, operacion));
}
exports.sacarPuntajeBigFiveJson = sacarPuntajeBigFiveJson;
function sacarPuntajeBigFiveJsonArray(puntajesPersonas, tablaPuntajes, escalaPuntaje, operacion) {
    return puntajesPersonas.map((puntajesPersona) => {
        return sacarPuntajeBigFiveJson(puntajesPersona, tablaPuntajes, escalaPuntaje, operacion);
    });
}
exports.sacarPuntajeBigFiveJsonArray = sacarPuntajeBigFiveJsonArray;
class BigFive {
    constructor(tablaPuntajes, escalaPuntaje, operacion) {
        this.tablaPuntajes = tablaPuntajes;
        this.escalaPuntaje = escalaPuntaje;
        this.operacion = operacion;
    }
    sacarPuntajeBigFive(puntajesPersona) {
        return sacarPuntajeBigFive(puntajesPersona, this.tablaPuntajes, this.escalaPuntaje, this.operacion);
    }
    sacarPuntajeBigFiveJson(puntajesPersona) {
        return sacarPuntajeBigFiveJson(puntajesPersona, this.tablaPuntajes, this.escalaPuntaje, this.operacion);
    }
    sacarPuntajeBigFiveJsonArray(puntajesPersonas) {
        return sacarPuntajeBigFiveJsonArray(puntajesPersonas, this.tablaPuntajes, this.escalaPuntaje, this.operacion);
    }
}
exports.BigFive = BigFive;
