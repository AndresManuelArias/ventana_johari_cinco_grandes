import * as fs from 'fs';
const R = require('ramda');

import {Graficar} from './Graficar';

import  {UsuarioVentanaDeJohariBigFiveJson}  from '../bigFiveJohari/bigFiveJohari';
var datosVentanaDeHonaryBigFive:string = fs.readFileSync('../data_base/ventanaDeHonaryBigFiveRespuesta.json','utf-8');

var graficar = new Graficar({savePage:'../public/graficaTabulacion.html',title:'big five'})
type Entorno  ={
    "nombre_entorno":string
    "personas_entorno":UsuarioVentanaDeJohariBigFiveJson
}
function verOpinionDe(columna:string,people:any,bigFive:any){
    let yd:number[] = [];
    let sumaTotalScoreD:number = 0;
    let conjunto:number[] = R.props(R.keys(people[columna]), people[columna])
    sumaTotalScoreD = R.sum(conjunto.filter((n:number) => n>-1));
    console.log('sumaTotalScore',sumaTotalScoreD)
    bigFive.forEach((factor:number)=>{
        console.log(people['nombre usuario'],' sumaTotalScore '+columna,sumaTotalScoreD,people[columna][factor]/sumaTotalScoreD)
        let porcentajes = people[columna][factor]/sumaTotalScoreD
        yd.push(porcentajes>0?sumaTotalScoreD*100:0)         
    }) 
    return {y:yd,title:columna} 
}
var objectVentanaDeHonaryBigFive:any[] = JSON.parse(datosVentanaDeHonaryBigFive);
console.log(objectVentanaDeHonaryBigFive)
objectVentanaDeHonaryBigFive[0]["personas_entorno"].forEach((people:any,index:any)=>{
    var zonas:any[] = ["zonaAbierta",
        "zonaCiega",
        "zonaOculta"] //R.keys(people["ventana de johari"])
    var bigFive:any[] = R.keys(people["ventana de johari"][zonas[0]])
    var puntajeZonasPorcentajes:any = []
    zonas.forEach((zona:any)=>{
        let y:number[] = [];
        let sumaTotalScore:number = 0;
        let conjunto:number[] = R.props(R.keys(people["ventana de johari"][zona]), people["ventana de johari"][zona])
        sumaTotalScore = R.sum(conjunto.filter((n:number) => n>-1));
        console.log('sumaTotalScore',sumaTotalScore)
        bigFive.forEach((factor:any)=>{
            console.log(people['nombre usuario'],' sumaTotalScore',sumaTotalScore,people["ventana de johari"][zona][factor]/sumaTotalScore)
            let porcentajes = people["ventana de johari"][zona][factor]/sumaTotalScore
            y.push(porcentajes?sumaTotalScore*100:0)      
        })       
        puntajeZonasPorcentajes.push({y:y,title:zona})
    }) 
    // ver el puntaje propio del usuario
    puntajeZonasPorcentajes.push(verOpinionDe("opinion propia",people,bigFive))
      // ver el puntaje opinion de los demas
    puntajeZonasPorcentajes.push(verOpinionDe("opinion otros",people,bigFive))  
    
    // sin porcentajes solo puntaje en bruto
    var puntajeZonas:any = []
    zonas.forEach((zona:any)=>{
        let y:number[] = [];
        bigFive.forEach((factor:any)=>{
            console.log(people['nombre usuario'])
            y.push(people["ventana de johari"][zona][factor])      
        })       
        puntajeZonas.push({y:y,title:zona})
    }) 
    // ver el puntaje propio del usuario
    let ypScore:number[] = [];
    let sumaTotalScorep:number = 0;
    sumaTotalScorep = R.sum(R.props(R.keys(people["opinion propia"]), people["opinion propia"]));
    console.log('sumaTotalScore',sumaTotalScorep)
    bigFive.forEach((factor:number)=>{
        console.log(people['nombre usuario'],' sumaTotalScore opinion propia',sumaTotalScorep)
        ypScore.push(people["opinion propia"][factor])      
    }) // verificar por que la opinion propia no es igual a la suma de la zona abierta con la zona oculta, verificar si las sumas o lo promedios alteran estos datos
    puntajeZonas.push({y:ypScore,title:"opinion propia"})


    graficar.graficarTorta(bigFive,puntajeZonasPorcentajes,{id:index+'p',title:people['nombre usuario']})
    graficar.graficarBarras(bigFive,puntajeZonas,{id:index+'b',title:people['nombre usuario']})

})
