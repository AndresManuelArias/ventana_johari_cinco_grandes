"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bigfiveJohariPerson(factorBigfive, persona_entorno) {
    let ventanaDeJohariBigFive = {};
    for (let zona in persona_entorno["ventana de johari"]) {
        ventanaDeJohariBigFive[zona] = {};
        for (let factor in factorBigfive) {
            ventanaDeJohariBigFive[zona][factor] = {};
            ventanaDeJohariBigFive[zona][factor]['colection'] = [];
            persona_entorno["ventana de johari"][zona].forEach((elementZona) => {
                if (factorBigfive[factor].some((comportamiento) => elementZona.comportamiento === comportamiento)) {
                    console.log('zona', zona, 'elementZona', elementZona, 'factor', factor);
                    ventanaDeJohariBigFive[zona][factor]['colection'].push(elementZona);
                }
            });
            let cantidadPuntajes = ventanaDeJohariBigFive[zona][factor]['colection'].length;
            console.log('cantidadPuntajes', cantidadPuntajes);
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
