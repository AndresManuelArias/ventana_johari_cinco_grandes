"use strict";
// este solo recive los adjetivos
Object.defineProperty(exports, "__esModule", { value: true });
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
    console.log('puntajesPersona', puntajesPersona);
    let scoreBigfive = new Map();
    let bigFive = ["amabilidad",
        "neuroticismo",
        "extraversión",
        "responsabilidad",
        "apertura"];
    tablaPuntajes.forEach((fila) => {
        // console.log(fila["Adjetivo"])
        if (Array.isArray(puntajesPersona[fila["Adjetivo"]])) { // en un futuro el promedio puede ser una Media Aritmética Ponderada, donde se le da mas peso a la calificacion realizada por un psicologo
            /**
             * ahora se va sacar primero el peso de cada puntaje y con esto se saca el promedio, moda, media
             */
            bigFive.forEach(factor => {
                // console.log('factor',factor)
                let puntajeFactor = Number(fila[factor]);
                // console.log('puntajeFactor',puntajeFactor)
                // console.log('puntajesPersona[fila["Adjetivo"]]',puntajesPersona[fila["Adjetivo"]])
                // console.log('fila["Adjetivo"]',fila["Adjetivo"])
                let pesosAdjetivosBigFive = Array.isArray(puntajesPersona[fila["Adjetivo"]]) ? puntajesPersona[fila["Adjetivo"]].map(puntajeAdjetivo => darPeso(puntajeAdjetivo, puntajeFactor, escalaPuntaje)) : [darPeso([puntajesPersona[fila["Adjetivo"]]].flat()[0], puntajeFactor, escalaPuntaje)];
                // console.log('pesosAdjetivosBigFive',pesosAdjetivosBigFive)
                if (scoreBigfive.has(factor)) { //una coleccion que tiene valor de 0, es por que ese abjetivo tiene un valor de cero en un factor pero no en otros factores
                    // console.log('scoreBigfive.get(factor)',scoreBigfive.get(factor))
                    // // console.log('puntajeMean',puntajeMean,'Adjetivo',fila["Adjetivo"],'inversionPuntaje',puntajeFactor,'fila[factor]',fila[factor],factor,inversionPuntaje( puntajeMean,puntajeFactor,escalaPuntaje))                                  
                    scoreBigfive.set(factor, scoreBigfive.get(factor).concat(pesosAdjetivosBigFive));
                }
                else {
                    scoreBigfive.set(factor, pesosAdjetivosBigFive);
                }
                // console.log('scoreBigfive',scoreBigfive)
            });
            // let puntajeMean = operacion ==undefined? JSON.parse(`{"${fila["Adjetivo"]}":[${puntajesPersona[fila["Adjetivo"]]}]}`): Array.isArray(puntajesPersona[fila["Adjetivo"]])? jStat[operacion ==undefined?'mean':operacion](puntajesPersona[fila["Adjetivo"]]):puntajesPersona[fila["Adjetivo"]]// se verifica la calificacion de cada adjetivo y se saca un promedio si esta es mayor a uno
            // // console.log('puntajeMean',puntajeMean)
            // bigFive.forEach(factor => {   
            //     if(scoreBigfive.has(factor)) {    //una coleccion que tiene valor de 0, es por que ese abjetivo tiene un valor de cero en un factor pero no en otros factores
            //         let puntajeFactor:number=  Number(fila[factor])
            // console.log('puntajeMean',puntajeMean,'Adjetivo',fila["Adjetivo"],'inversionPuntaje',puntajeFactor,'fila[factor]',fila[factor],factor,inversionPuntaje( puntajeMean,puntajeFactor,escalaPuntaje))
            //         scoreBigfive.get(factor).push(operacion ==undefined ?puntajeMean:darPeso( puntajeMean,puntajeFactor,escalaPuntaje))
            //     }else{
            //         scoreBigfive.set(factor, [operacion ==undefined ?puntajeMean:darPeso( puntajeMean,fila[factor],escalaPuntaje)]) 
            //     }    
            // });         
        }
    });
    // console.log('operacion',operacion)
    if (operacion !== undefined) {
        scoreBigfive.forEach((value, key, map) => {
            // console.log('value',value,'key', key)
            // console.log('operacion',operacion,jStat[operacion](value))
            scoreBigfive.set(key, jStat[operacion](value));
        });
    }
    return scoreBigfive;
}
function convertirPuntajeBigFiveInJson(resultadoBigFive) {
    // let bigFiveJson:BigFiveJson ={            
    //     "amabilidad":null,
    //     "neuroticismo":null,
    //     "extraversión":null,
    //     "responsabilidad":null,
    //     "apertura":null
    // }
    // for (var [clave, valor] of resultadoBigFive) {
    //     bigFiveJson[clave] = valor
    //   } 
    // return bigFiveJson;
    let bigFiveJson = Object.fromEntries(resultadoBigFive);
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
