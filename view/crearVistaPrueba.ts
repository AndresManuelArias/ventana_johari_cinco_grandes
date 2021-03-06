import * as fs from 'fs';
import * as R from 'ramda'

import {Graficar} from './Graficar';

import  {UsuarioVentanaDeJohariBigFiveJson}  from '../bigFiveJohari/bigFiveJohari';
var datosVentanaDeHonaryBigFive:string = fs.readFileSync('../data_base/ventanaDeHonaryBigFivePruebaPromedioPonderado.json','utf-8');

var graficar = new Graficar({savePage:'../public/graficaPrueba.html',title:'big five'})
type Entorno  ={
    "nombre_entorno":string
    "personas_entorno":UsuarioVentanaDeJohariBigFiveJson
}
var objectVentanaDeHonaryBigFive:UsuarioVentanaDeJohariBigFiveJson[] = JSON.parse(datosVentanaDeHonaryBigFive);
objectVentanaDeHonaryBigFive.forEach((people:any,index)=>{
    var zonas:any[] = ["zonaAbierta",
        "zonaCiega",
        "zonaOculta"] //R.keys(people["ventana de johari"])
    var bigFive:any[] = R.keys(people["ventana de johari"][zonas[0]])
    var puntajeZonasPorcentajes:any = []
    zonas.forEach((zona:any)=>{
        let y:number[] = [];
        let sumaTotalScore:number = 0;

        sumaTotalScore = R.sum(R.props(R.keys(people["ventana de johari"][zona]), people["ventana de johari"][zona]));
        console.log('sumaTotalScore',sumaTotalScore)
        bigFive.forEach((factor:any)=>{
            console.log(people['nombre usuario'],' sumaTotalScore',sumaTotalScore,people["ventana de johari"][zona][factor]/sumaTotalScore)
            y.push(people["ventana de johari"][zona][factor]/sumaTotalScore*100)      
        })       
        puntajeZonasPorcentajes.push({y:y,title:zona})
    }) 
    // ver el puntaje propio del usuario
    let yp:number[] = [];
    let sumaTotalScorep:number = 0;

    sumaTotalScorep = R.sum(R.props(R.keys(people["opinion propia"]), people["opinion propia"]));
    console.log('sumaTotalScore',sumaTotalScorep)
    bigFive.forEach((factor:number)=>{
        console.log(people['nombre usuario'],' sumaTotalScore opinion propia',sumaTotalScorep,people["opinion propia"][factor]/sumaTotalScorep)
        yp.push(people["opinion propia"][factor]/sumaTotalScorep*100)      
    }) 
    puntajeZonasPorcentajes.push({y:yp,title:"opinion propia"})
    
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

sumaTotalScorep = R.sum(R.props(R.keys(people["opinion propia"]), people["opinion propia"]));
console.log('sumaTotalScore',sumaTotalScorep)
bigFive.forEach((factor:number)=>{
    console.log(people['nombre usuario'],' sumaTotalScore opinion propia',sumaTotalScorep)
    ypScore.push(people["opinion propia"][factor])      
}) // verificar por que la opiniion propia no es igual a la suma de la zona abierta con la zona oculta, verificar si las sumas o lo promedios alteran estos datos
puntajeZonas.push({y:ypScore,title:"opinion propia"})


    graficar.graficarTorta(bigFive,puntajeZonasPorcentajes,{id:index+'p',title:people['nombre usuario']})
    graficar.graficarBarras(bigFive,puntajeZonas,{id:index+'b',title:people['nombre usuario']})

})
