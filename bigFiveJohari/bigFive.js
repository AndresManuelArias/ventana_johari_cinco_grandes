"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// este solo recive los adjetivos
var jStat = require('jStat').jStat;
function inversionPuntaje(puntaje, asignacionPuntaje, escalaPuntaje) {
    let puntajeFinal = puntaje * Math.abs(asignacionPuntaje);
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
            let puntajeMean = Array.isArray(puntajesPersona[fila["Adjetivo"]]) ? jStat[operacion.dominio](puntajesPersona[fila["Adjetivo"]]) : puntajesPersona[fila["Adjetivo"]]; // se verifica la calificacion de cada adjetivo y se saca un promedio si esta es mayor a uno
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
                    scoreBigfive.get(factor).push(inversionPuntaje(puntajeMean, puntajeFactor, escalaPuntaje));
                }
                else {
                    scoreBigfive.set(factor, [inversionPuntaje(puntajeMean, fila[factor], escalaPuntaje)]);
                }
            });
        }
    });
    console.log('operacion', operacion);
    if (operacion.rango !== undefined) {
        scoreBigfive.forEach((factores, key) => {
            scoreBigfive.set(key, jStat[operacion.rango](factores));
        });
        console.log('scoreBigfive operacion', scoreBigfive);
    }
    return scoreBigfive;
}
class BigFive {
    constructor(tablaPuntajes, escalaPuntaje, operacion) {
        this.tablaPuntajes = tablaPuntajes;
        this.escalaPuntaje = escalaPuntaje;
        this.operacion = operacion;
    }
    sacarPuntajeBigFive(puntajesPersona) {
        return sacarPuntajeBigFive(puntajesPersona, this.tablaPuntajes, this.escalaPuntaje, this.operacion);
    }
}
exports.BigFive = BigFive;
