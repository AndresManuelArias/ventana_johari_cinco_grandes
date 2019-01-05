"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Graficar_1 = require("./Graficar");
var datosVentanaDeHonaryBigFive = fs_1.default.readFileSync('../data_base/resultadoVentanaDeHonaryBigfive.json', 'utf-8');
var graficar = new Graficar_1.Graficar({ savePage: '../public/grafica.html', title: 'big five' });
var objectVentanaDeHonaryBigFive = JSON.parse(datosVentanaDeHonaryBigFive);
var zonas = ['abierta', 'ciega', 'oculta'];
var bigFive = ['apertura', 'noApertura', 'amable', 'noAmable', 'extroversion', 'introversion', 'neuroticismo', 'noNeurotismo', 'obedienciaNormas', 'noObedienciaNormas'];
objectVentanaDeHonaryBigFive.forEach((people, index) => {
    var puntajeZonas = [];
    zonas.forEach((zona) => {
        var y = [];
        bigFive.forEach((factor) => {
            y.push(people.ventanaDeJohariBigFive[zona][factor].score);
        });
        puntajeZonas.push({ y: y, title: zona });
    });
    graficar.graficarBarras(bigFive, puntajeZonas, { id: index, title: people['nombre usuario'] });
});
