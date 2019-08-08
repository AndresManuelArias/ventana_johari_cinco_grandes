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
var datosVentanaDeHonaryBigFive = fs.readFileSync('../data_base/ventanaDeHonaryBigFiveRespuesta.json', 'utf-8');
var graficar = new Graficar_1.Graficar({ savePage: '../public/graficaTabulacionAdsi1.html', title: 'big five' });
function verOpinionDe(columna, people, bigFive) {
    let yd = [];
    let sumaTotalScoreD = 0;
    let conjunto = R.props(R.keys(people[columna]), people[columna]);
    sumaTotalScoreD = R.sum(conjunto.filter((n) => n > -1));
    console.log('sumaTotalScore', sumaTotalScoreD);
    bigFive.forEach((factor) => {
        console.log(people['nombre usuario'], ' sumaTotalScore ' + columna, sumaTotalScoreD, people[columna][factor] / sumaTotalScoreD);
        let porcentajes = people[columna][factor] / sumaTotalScoreD;
        yd.push(porcentajes > 0 ? sumaTotalScoreD * 100 : 0);
    });
    return { y: yd, title: columna };
}
var objectVentanaDeHonaryBigFive = JSON.parse(datosVentanaDeHonaryBigFive);
console.log(objectVentanaDeHonaryBigFive);
objectVentanaDeHonaryBigFive[0]["personas_entorno"].forEach((people, index) => {
    var zonas = ["zonaAbierta",
        "zonaCiega",
        "zonaOculta"]; //R.keys(people["ventana de johari"])
    var bigFive = R.keys(people["ventana de johari"]['zonaDesconocida']);
    var puntajeZonasPorcentajes = [];
    zonas.forEach((zona) => {
        let y = [];
        let sumaTotalScore = 0;
        let conjunto = R.props(R.keys(people["ventana de johari"][zona]), people["ventana de johari"][zona]);
        sumaTotalScore = R.sum(conjunto.filter((n) => n > -1));
        console.log('sumaTotalScore', sumaTotalScore);
        bigFive.forEach((factor) => {
            console.log(people['nombre usuario'], ' sumaTotalScore', sumaTotalScore, people["ventana de johari"][zona][factor] / sumaTotalScore);
            let porcentajes = people["ventana de johari"][zona][factor] / sumaTotalScore;
            y.push(porcentajes ? sumaTotalScore * 100 : 0);
        });
        puntajeZonasPorcentajes.push({ y: y, title: zona });
    });
    // ver el puntaje propio del usuario
    puntajeZonasPorcentajes.push(verOpinionDe("opinion propia", people, bigFive));
    // ver el puntaje opinion de los demas
    puntajeZonasPorcentajes.push(verOpinionDe("opinion otros", people, bigFive));
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
    let sumaTotalScorep = 0;
    sumaTotalScorep = R.sum(R.props(R.keys(people["opinion propia"]), people["opinion propia"]));
    console.log('sumaTotalScore', sumaTotalScorep);
    bigFive.forEach((factor) => {
        console.log(people['nombre usuario'], ' sumaTotalScore opinion propia', sumaTotalScorep);
        ypScore.push(people["opinion propia"][factor]);
        ypScore.push(people["opinion otros"][factor]);
    }); // verificar por que la opinion propia no es igual a la suma de la zona abierta con la zona oculta, verificar si las sumas o lo promedios alteran estos datos
    puntajeZonas.push({ y: ypScore, title: "opinion propia" });
    let ypScoreOtros = [];
    bigFive.forEach((factor) => {
        console.log(people['nombre usuario'], ' sumaTotalScore opinion otros', sumaTotalScorep);
        ypScoreOtros.push(people["opinion otros"][factor]);
    }); // verificar por que la opinion propia no es igual a la suma de la zona abierta con la zona oculta, verificar si las sumas o lo promedios alteran estos datos
    puntajeZonas.push({ y: ypScoreOtros, title: "opinion otros" });
    graficar.graficarTorta(bigFive, puntajeZonasPorcentajes, { id: index + 'p', title: people['nombre usuario'] });
    graficar.graficarBarras(bigFive, puntajeZonas, { id: index + 'b', title: people['nombre usuario'] });
});
