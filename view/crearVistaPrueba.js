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
const R = __importStar(require("ramda"));
const Graficar_1 = require("./Graficar");
var datosVentanaDeHonaryBigFive = fs.readFileSync('../data_base/ventanaDeHonaryBigFivePruebaPromedioPonderado.json', 'utf-8');
var graficar = new Graficar_1.Graficar({ savePage: '../public/graficaPrueba.html', title: 'big five' });
var objectVentanaDeHonaryBigFive = JSON.parse(datosVentanaDeHonaryBigFive);
objectVentanaDeHonaryBigFive.forEach((people, index) => {
    var zonas = ["zonaAbierta",
        "zonaCiega",
        "zonaOculta"]; //R.keys(people["ventana de johari"])
    var bigFive = R.keys(people["ventana de johari"][zonas[0]]);
    var puntajeZonasPorcentajes = [];
    zonas.forEach((zona) => {
        let y = [];
        let sumaTotalScore = 0;
        sumaTotalScore = R.sum(R.props(R.keys(people["ventana de johari"][zona]), people["ventana de johari"][zona]));
        console.log('sumaTotalScore', sumaTotalScore);
        bigFive.forEach((factor) => {
            console.log(people['nombre usuario'], ' sumaTotalScore', sumaTotalScore, people["ventana de johari"][zona][factor] / sumaTotalScore);
            y.push(people["ventana de johari"][zona][factor] / sumaTotalScore * 100);
        });
        puntajeZonasPorcentajes.push({ y: y, title: zona });
    });
    // ver el puntaje propio del usuario
    let yp = [];
    let sumaTotalScorep = 0;
    sumaTotalScorep = R.sum(R.props(R.keys(people["opinion propia"]), people["opinion propia"]));
    console.log('sumaTotalScore', sumaTotalScorep);
    bigFive.forEach((factor) => {
        console.log(people['nombre usuario'], ' sumaTotalScore opinion propia', sumaTotalScorep, people["opinion propia"][factor] / sumaTotalScorep);
        yp.push(people["opinion propia"][factor] / sumaTotalScorep * 100);
    });
    puntajeZonasPorcentajes.push({ y: yp, title: "opinion propia" });
    // sin porcentajes solo puntaje en bruto
    var puntajeZonas = [];
    zonas.forEach((zona) => {
        let y = [];
        bigFive.forEach((factor) => {
            console.log(people['nombre usuario']);
            y.push(people["ventana de johari"][zona][factor]);
        });
        puntajeZonas.push({ y: y, title: zona });
    });
    // ver el puntaje propio del usuario
    let ypScore = [];
    sumaTotalScorep = R.sum(R.props(R.keys(people["opinion propia"]), people["opinion propia"]));
    console.log('sumaTotalScore', sumaTotalScorep);
    bigFive.forEach((factor) => {
        console.log(people['nombre usuario'], ' sumaTotalScore opinion propia', sumaTotalScorep);
        ypScore.push(people["opinion propia"][factor]);
    }); // verificar por que la opiniion propia no es igual a la suma de la zona abierta con la zona oculta, verificar si las sumas o lo promedios alteran estos datos
    puntajeZonas.push({ y: ypScore, title: "opinion propia" });
    graficar.graficarTorta(bigFive, puntajeZonasPorcentajes, { id: index + 'p', title: people['nombre usuario'] });
    graficar.graficarBarras(bigFive, puntajeZonas, { id: index + 'b', title: people['nombre usuario'] });
});
