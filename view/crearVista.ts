import * as fs from 'fs';

import {Graficar} from './Graficar';

import  {UsuarioVentanaDeJohariBigFive}  from '../bigFiveJohari/bigFiveJohari';
var datosVentanaDeHonaryBigFive:string = fs.readFileSync('../data_base/resultadoVentanaDeHonaryBigfive.json','utf-8');

var graficar = new Graficar({savePage:'../public/grafica.html',title:'big five'})

var objectVentanaDeHonaryBigFive:UsuarioVentanaDeJohariBigFive[] = JSON.parse(datosVentanaDeHonaryBigFive);
var zonas = ['abierta','ciega','oculta'];
var bigFive = ['apertura','noApertura','amable','noAmable','extroversion','introversion','neuroticismo','noNeurotismo','obedienciaNormas','noObedienciaNormas']
objectVentanaDeHonaryBigFive.forEach((people,index)=>{
    var puntajeZonas:any = []
    var sumaTotalScore = 0;
    for(let zona in  people.ventanaDeJohariBigFive){
        for(let factor in people.ventanaDeJohariBigFive[zona]){
            sumaTotalScore += people.ventanaDeJohariBigFive[zona][factor].score
        }
    }
    zonas.forEach((zona:string)=>{
        var y:number[] = [];
        bigFive.forEach((factor:string)=>{
            console.log('sumaTotalScore',sumaTotalScore,people.ventanaDeJohariBigFive[zona][factor].score/sumaTotalScore)
            y.push(people.ventanaDeJohariBigFive[zona][factor].score/sumaTotalScore*100)      
        }) 
        puntajeZonas.push({y:y,title:zona})
    }) 
    graficar.graficarTorta(bigFive,puntajeZonas,{id:index+'p',title:people['nombre usuario']})
    graficar.graficarBarras(bigFive,puntajeZonas,{id:index+'b',title:people['nombre usuario']})

})
