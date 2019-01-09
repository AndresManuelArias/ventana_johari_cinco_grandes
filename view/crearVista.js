"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const Graficar_1 = require("./Graficar");
var datosVentanaDeHonaryBigFive = fs.readFileSync('../data_base/resultadoVentanaDeHonaryBigfive.json', 'utf-8');
var graficar = new Graficar_1.Graficar({ savePage: '../public/grafica.html', title: 'big five' });
var objectVentanaDeHonaryBigFive = JSON.parse(datosVentanaDeHonaryBigFive);
var zonas = ['abierta', 'ciega', 'oculta'];
var bigFive = ['apertura', 'noApertura', 'amable', 'noAmable', 'extroversion', 'introversion', 'neuroticismo', 'noNeurotismo', 'obedienciaNormas', 'noObedienciaNormas'];
objectVentanaDeHonaryBigFive.forEach((people, index) => {
    var puntajeZonas = [];
    var sumaTotalScore = 0;
    for (let zona in people.ventanaDeJohariBigFive) {
        for (let factor in people.ventanaDeJohariBigFive[zona]) {
            sumaTotalScore += people.ventanaDeJohariBigFive[zona][factor].score;
        }
    }
    zonas.forEach((zona) => {
        var y = [];
        bigFive.forEach((factor) => {
            console.log('sumaTotalScore', sumaTotalScore, people.ventanaDeJohariBigFive[zona][factor].score / sumaTotalScore);
            y.push(people.ventanaDeJohariBigFive[zona][factor].score / sumaTotalScore * 100);
        });
        puntajeZonas.push({ y: y, title: zona });
    });
    graficar.graficarTorta(bigFive, puntajeZonas, { id: index + 'p', title: people['nombre usuario'] });
    graficar.graficarBarras(bigFive, puntajeZonas, { id: index + 'b', title: people['nombre usuario'] });
});
