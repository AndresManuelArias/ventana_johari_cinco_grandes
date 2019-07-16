"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require('ramda');
function bigfiveJohariPerson(factorBigfive, persona_entorno) {
    let ventanaDeJohariBigFive = {};
    for (let zona in persona_entorno["ventana de johari"]) {
        ventanaDeJohariBigFive[zona] = {};
        for (let factor in factorBigfive) {
            ventanaDeJohariBigFive[zona][factor] = {};
            ventanaDeJohariBigFive[zona][factor]['colection'] = [];
            persona_entorno["ventana de johari"][zona].forEach((elementZona) => {
                if (factorBigfive[factor].some((comportamiento) => elementZona.comportamiento === comportamiento)) {
                    // console.log('zona',zona,'elementZona',elementZona,'factor',factor)
                    ventanaDeJohariBigFive[zona][factor]['colection'].push(elementZona);
                }
            });
            let cantidadPuntajes = ventanaDeJohariBigFive[zona][factor]['colection'].length;
            // console.log('cantidadPuntajes',cantidadPuntajes)
            ventanaDeJohariBigFive[zona][factor]['score'] = cantidadPuntajes ? ventanaDeJohariBigFive[zona][factor]['colection'].map((objetc) => objetc.puntaje).reduce((puntajeA, puntajeB) => puntajeA + puntajeB) : 0;
        }
    }
    return { 'nombre usuario': persona_entorno['nombre usuario'], ventanaDeJohariBigFive: ventanaDeJohariBigFive };
}
exports.bigfiveJohariPerson = bigfiveJohariPerson;
function bigfiveJohariEntorno(factorBigfive, dataJohariEntorno) {
    return dataJohariEntorno.personas_entorno.map((personaEntorno) => bigfiveJohariPerson(factorBigfive, personaEntorno));
}
exports.bigfiveJohariEntorno = bigfiveJohariEntorno;
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
exports.inversionPuntaje = inversionPuntaje;
function generarBigFiveJohari(ventanaDeJohariUsuario, tablaPuntajes, escalaPuntaje) {
    const convetirMapToJson = (comportamientos) => convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(comportamientos, tablaPuntajes, escalaPuntaje));
    return R.map(convetirMapToJson, ventanaDeJohariUsuario); //en los resultados que dan array lo mejor es hacer una suma
}
exports.generarBigFiveJohari = generarBigFiveJohari;
function sumaFactores(factor) {
    return Array.isArray(factor) ? R.sum(factor) : factor;
}
function generarBigFiveJohariSum(ventanaDeJohariUsuario, tablaPuntajes, escalaPuntaje) {
    // const sumaFactores = (factor:number|number[]) => { 
    //     return Array.isArray(factor)?R.sum(factor):factor;
    // };         
    const convetirMapToJson = (comportamientos) => {
        let bigFiveJson = convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(comportamientos, tablaPuntajes, escalaPuntaje));
        return R.map(sumaFactores, bigFiveJson); //se podria dividir por la sumatoria de los factores y de esta manera sacar una media ponderada;
    };
    return R.map(convetirMapToJson, ventanaDeJohariUsuario); //en los resultados que dan array lo mejor es hacer una suma
}
exports.generarBigFiveJohariSum = generarBigFiveJohariSum;
function convertirPuntajeBigFiveInJson(resultadoBigFive) {
    let bigFiveJson = {
        "amabilidad": 0,
        "neuroticismo": 0,
        "extraversión": 0,
        "responsabilidad": 0,
        "apertura": 0
    };
    for (var [clave, valor] of resultadoBigFive) {
        bigFiveJson[clave] = valor;
    }
    return bigFiveJson;
}
exports.convertirPuntajeBigFiveInJson = convertirPuntajeBigFiveInJson;
function bifivePersonasSumaFactores(puntajesPersona, tablaPuntajes, escalaPuntaje) {
    let bigFiveJson = convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(puntajesPersona, tablaPuntajes, escalaPuntaje));
    return R.map(sumaFactores, bigFiveJson);
}
exports.bifivePersonasSumaFactores = bifivePersonasSumaFactores;
function sacarPuntajeBigFive(puntajesPersona, tablaPuntajes, escalaPuntaje) {
    let scoreBigfive = new Map();
    tablaPuntajes.forEach((fila) => {
        // console.log(fila["Adjetivo"])
        if (puntajesPersona[fila["Adjetivo"]]) { // en un futuro el promedio puede ser una Media Aritmética Ponderada, donde se le da mas peso a la calificacion realizada por un psicologo
            let puntajeMean = Array.isArray(puntajesPersona[fila["Adjetivo"]]) ? R.mean(puntajesPersona[fila["Adjetivo"]]) : puntajesPersona[fila["Adjetivo"]]; // se verifica la calificacion de cada adjetivo y se saca un promedio si esta es mayor a uno
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
    return scoreBigfive;
}
exports.sacarPuntajeBigFive = sacarPuntajeBigFive;
function bigFiveJohariVariasPersonasPorcentajeFactores(ventanaDeJohariUsuario, tablaPuntajes, escalaPuntaje) {
    // const sumaFactores = (factor:number|number[]) => { 
    //     return Array.isArray(factor)?R.sum(factor):factor;
    // };         
    const convetirMapToJson = (comportamientos) => {
        return bifiveUnaPersonaPorcentajeDeFactores(comportamientos, tablaPuntajes, escalaPuntaje);
    };
    return R.map(convetirMapToJson, ventanaDeJohariUsuario);
}
exports.bigFiveJohariVariasPersonasPorcentajeFactores = bigFiveJohariVariasPersonasPorcentajeFactores;
function bifiveUnaPersonaPorcentajeDeFactores(puntajesPersona, tablaPuntajes, escalaPuntaje) {
    let bigFivePuntajes = convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(puntajesPersona, tablaPuntajes, escalaPuntaje));
    let pesos = sacarPesosAdjetivos(puntajesPersona, tablaPuntajes);
    let pesosBifive = {};
    for (let factor in pesos) {
        pesosBifive[factor] = pesos[factor].map(x => x * escalaPuntaje.max).filter(x => x > 0);
    }
    // console.log('pesosBifive',pesosBifive)
    let bigFiveJson = { "amabilidad": 0,
        "neuroticismo": 0,
        "extraversión": 0,
        "responsabilidad": 0,
        "apertura": 0 };
    for (let index in bigFivePuntajes) {
        // console.log('index',index,'ponderado',promedioPonderado(bigFivePuntajes[index],pesosBifive[index]))
        bigFiveJson[index] = promedioPonderado(bigFivePuntajes[index], pesosBifive[index]) * 100;
    }
    // console.log('bigFiveJson',bigFiveJson)
    return bigFiveJson;
}
exports.bifiveUnaPersonaPorcentajeDeFactores = bifiveUnaPersonaPorcentajeDeFactores;
function sacarPesosAdjetivos(puntajesPersona, tablaPuntajes) {
    let filtrados = tablaPuntajes; //.filter((fila)=> puntajesPersona[fila["Adjetivo"]] )
    let bigFiveJson = {
        "amabilidad": [],
        "neuroticismo": [],
        "extraversión": [],
        "responsabilidad": [],
        "apertura": []
    };
    filtrados.forEach((fila) => {
        for (let factor in bigFiveJson) {
            bigFiveJson[factor].push(inversionPuntaje(1, fila[factor], { min: 1, max: 1 }));
        }
    });
    return bigFiveJson;
}
function promedioPonderado(puntajesFactorizado, pesos) {
    // console.log('puntajesFactorizado',puntajesFactorizado,'pesos',pesos)
    // console.log(sumaFactores(puntajesFactorizado)/R.sum(pesos))
    let sumaPeso = R.sum(pesos);
    let dividendo = sumaPeso == 0 ? 1 : sumaPeso;
    return sumaFactores(puntajesFactorizado) / dividendo;
    // const average = R.converge(R.divide, [R.sum, R.length])
    // average([1, 2, 3, 4, 5, 6, 7]) //=> 4
    // return Array.isArray(factor)?R.sum(factor):factor;
}
