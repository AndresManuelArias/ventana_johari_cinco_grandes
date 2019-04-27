import { isArray } from "util";

const R = require('ramda');

interface Zona {
    comportamiento:string
    puntaje:number
}
type Comportamientos = {
    [key: string]: number[]
}
interface VentanaDeJohari{
    [key: string]: any
    'abierta':Zona[]|Comportamientos
    'ciega':Zona[]|Comportamientos
    'oculta':Zona[]|Comportamientos
    'desconocida':Zona[]|Comportamientos
}

interface Persona_entorno
{
'nombre usuario':string
'ventana de johari':VentanaDeJohari
}
interface DataJohariEntorno {
    nombre_entorno:string
    personas_entorno:Persona_entorno[]
}

interface FactorBigfive{
    [key: string]: any[]
    apertura:string[]|number[]
    noApertura?:string[]|number[]
    extroversion:string[]|number[]
    introversion?:string[]|number[]
    obedienciaNormas:string[]|number[]
    noObedienciaNormas?:string[]|number[]
    neuroticismo:string[]|number[]
    noNeurotismo?:string[]|number[]
    noAmable?:string[]|number[]
    amable:string[]|number[]
}
interface ScoreBigfive{
    [key: string]: {colection: Zona[],score:number}
    apertura:{colection: Zona[],score:number}
    noApertura:{colection: Zona[],score:number}
    extroversion:{colection: Zona[],score:number}
    introversion:{colection: Zona[],score:number}
    obedienciaNormas:{colection: Zona[],score:number}
    noObedienciaNormas:{colection: Zona[],score:number}
    neuroticismo:{colection: Zona[],score:number}
    noNeurotismo:{colection: Zona[],score:number}
    noAmable:{colection: Zona[],score:number}
    amable:{colection: Zona[],score:number}
}
interface VentanaDeJohariBigFive {
    [key: string]: any
    abierta:ScoreBigfive
    ciega:ScoreBigfive
    oculta:ScoreBigfive
    desconocida:ScoreBigfive
}
interface UsuarioVentanaDeJohariBigFive {
    'nombre usuario':string
    ventanaDeJohariBigFive:VentanaDeJohariBigFive
}

function bigfiveJohariPerson(factorBigfive:FactorBigfive,persona_entorno:Persona_entorno):UsuarioVentanaDeJohariBigFive{
    let ventanaDeJohariBigFive: VentanaDeJohariBigFive|any = {}

  for(let zona in persona_entorno["ventana de johari"]){
    ventanaDeJohariBigFive[zona] = {};    
    for(let factor in factorBigfive){
        ventanaDeJohariBigFive[zona][factor] = {}
        ventanaDeJohariBigFive[zona][factor]['colection'] = [] 
        persona_entorno["ventana de johari"][zona].forEach((elementZona:any) => {
            if(factorBigfive[factor].some((comportamiento:any) => elementZona.comportamiento === comportamiento) ){
                // console.log('zona',zona,'elementZona',elementZona,'factor',factor)
                ventanaDeJohariBigFive[zona][factor]['colection'].push(elementZona)
            }     
        });
        let cantidadPuntajes:any[] = ventanaDeJohariBigFive[zona][factor]['colection'].length
        // console.log('cantidadPuntajes',cantidadPuntajes)
        ventanaDeJohariBigFive[zona][factor]['score'] =cantidadPuntajes?ventanaDeJohariBigFive[zona][factor]['colection'].map((objetc:Zona)=> objetc.puntaje).reduce((puntajeA:number,puntajeB:number)=>puntajeA+puntajeB):0;
    }   
  }
  return {    'nombre usuario':persona_entorno['nombre usuario'],    ventanaDeJohariBigFive:ventanaDeJohariBigFive }  
}
function bigfiveJohariEntorno(factorBigfive:FactorBigfive,dataJohariEntorno:DataJohariEntorno):UsuarioVentanaDeJohariBigFive[]{
   return dataJohariEntorno.personas_entorno.map((personaEntorno)=>  bigfiveJohariPerson(factorBigfive,personaEntorno))
}
type TablaPuntajes = {
    [key: string]: any
"Adjetivo":string
"amabilidad":number
"neuroticismo":number
"extraversión":number
"responsabilidad":number
 "apertura":number
}
type EscalaPuntaje ={
    max:number,
    min:number
}
function inversionPuntaje(puntaje:number,asignacionPuntaje:number,escalaPuntaje:EscalaPuntaje){
    let puntajeFinal:number=puntaje * Math.abs(asignacionPuntaje) 
    if(asignacionPuntaje < 0 && puntaje >= escalaPuntaje.min  ){
        // console.log('resta puntaje',escalaPuntaje.max - puntajeFinal)
        // asignacionPuntaje = 1 -Math.abs(asignacionPuntaje)
        puntajeFinal = escalaPuntaje.max - puntajeFinal
    }
    // console.log('multiplicacion puntaje',escalaPuntaje.max - puntaje)

    return puntajeFinal 
}
interface UsuarioVentanaDeJohariBigFiveJson {
    'nombre usuario':string
    "ventana de johari":VentanaDeJohariBigFiveJson
}

type VentanaDeJohariBigFiveJson = {
    [key: string]: BigFiveJson
    "zonaAbierta":BigFiveJson
    "zonaCiega":BigFiveJson
    "zonaOculta":BigFiveJson
    "zonaDesconocida":BigFiveJson
}

function generarBigFiveJohari(ventanaDeJohariUsuario:VentanaDeJohari, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje):VentanaDeJohariBigFiveJson{
    const convetirMapToJson = (comportamientos:Comportamientos) => convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(comportamientos,tablaPuntajes,escalaPuntaje))
    return R.map(convetirMapToJson, ventanaDeJohariUsuario); //en los resultados que dan array lo mejor es hacer una suma
}
function sumaFactores  (factor:number|number[]):number  { 
    return Array.isArray(factor)?R.sum(factor):factor;
} 
function generarBigFiveJohariSum(ventanaDeJohariUsuario:VentanaDeJohari, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje):VentanaDeJohariBigFiveJson{
    // const sumaFactores = (factor:number|number[]) => { 
    //     return Array.isArray(factor)?R.sum(factor):factor;
    // };         
    const convetirMapToJson = (comportamientos:Comportamientos) => {
       let bigFiveJson:BigFiveJson = convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(comportamientos,tablaPuntajes,escalaPuntaje))
       return  R.map(sumaFactores, bigFiveJson)//se podria dividir por la sumatoria de los factores y de esta manera sacar una media ponderada;
    }
    return R.map(convetirMapToJson, ventanaDeJohariUsuario); //en los resultados que dan array lo mejor es hacer una suma
}
type BigFiveJsonP = {
    [key: string]: number[]
}
type BigFiveJson = {
    [key: string]: number|number[]
"amabilidad":number|number[]
"neuroticismo":number|number[]
"extraversión":number|number[]
"responsabilidad":number|number[]
"apertura":number|number[]
}

function convertirPuntajeBigFiveInJson(resultadoBigFive:Map<string,number[]>):BigFiveJson{
    let bigFiveJson:BigFiveJson ={            
        "amabilidad":0,
        "neuroticismo":0,
        "extraversión":0,
        "responsabilidad":0,
        "apertura":0
    }
    for (var [clave, valor] of resultadoBigFive) {
        bigFiveJson[clave] = valor
      }
    return bigFiveJson;
}
function bifivePersonasSumaFactores(puntajesPersona:Comportamientos, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje){
    let bigFiveJson = convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(puntajesPersona ,tablaPuntajes,escalaPuntaje))
    return R.map(sumaFactores, bigFiveJson);
}
function sacarPuntajeBigFive(puntajesPersona:Comportamientos, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje):Map<string,number[]>{
    let scoreBigfive:Map<string,number[]> = new Map();
    tablaPuntajes.forEach((fila)=>{// aqui se encuentra la valoracion o el peso que tiene cada adjetivo
        // console.log(fila["Adjetivo"])
        if(puntajesPersona[fila["Adjetivo"]]){// en un futuro el promedio puede ser una Media Aritmética Ponderada, donde se le da mas peso a la calificacion realizada por un psicologo
            let puntajeMean = Array.isArray(puntajesPersona[fila["Adjetivo"]])? R.mean(puntajesPersona[fila["Adjetivo"]]):puntajesPersona[fila["Adjetivo"]]// se verifica la calificacion de cada adjetivo y se saca un promedio si esta es mayor a uno
            let bigFive:string[] = ["amabilidad",
                "neuroticismo",
                "extraversión",
                "responsabilidad",
                "apertura"]
            bigFive.forEach(factor => {   
                if(scoreBigfive.has(factor)) {    //una coleccion que tiene valor de 0, es por que ese abjetivo tiene un valor de cero en un factor pero no en otros factores
                    let puntajeFactor:number=  Number(fila[factor])

                    // console.log('puntajeMean',puntajeMean,'Adjetivo',fila["Adjetivo"],'inversionPuntaje',puntajeFactor,'fila[factor]',fila[factor],factor,inversionPuntaje( puntajeMean,puntajeFactor,escalaPuntaje))
                    scoreBigfive.get(factor).push(inversionPuntaje( puntajeMean,puntajeFactor,escalaPuntaje))
                }else{
                    scoreBigfive.set(factor, [inversionPuntaje( puntajeMean,fila[factor],escalaPuntaje)]) 
                }    
            });         
        }    
    })
    return scoreBigfive;
}
function generarBigFiveJohariPorcentaje(ventanaDeJohariUsuario:VentanaDeJohari, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje):VentanaDeJohariBigFiveJson{
    // const sumaFactores = (factor:number|number[]) => { 
    //     return Array.isArray(factor)?R.sum(factor):factor;
    // };         
    const convetirMapToJson = (comportamientos:Comportamientos) => {
        return bifivePersonasPorcentajeFactores(comportamientos,tablaPuntajes,escalaPuntaje)
    }
    return R.map(convetirMapToJson, ventanaDeJohariUsuario); //en los resultados que dan array lo mejor es hacer una suma
}
function bifivePersonasPorcentajeFactores(puntajesPersona:Comportamientos, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje){
    let bigFivePuntajes:any = convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(puntajesPersona ,tablaPuntajes,escalaPuntaje))
    let pesos:BigFiveJsonP =  sacarPesosAdjetivos(puntajesPersona,tablaPuntajes)
    let pesosBifive:BigFiveJsonP={} 
    for(let factor in    pesos){
        pesosBifive[factor]= pesos[factor].map(x=>x *escalaPuntaje.max).filter(x=>x>0)
    }
    // console.log('pesosBifive',pesosBifive)
    let bigFiveJson:BigFiveJson ={"amabilidad":0,
    "neuroticismo":0,
    "extraversión":0,
    "responsabilidad":0,
    "apertura":0}

    for(let index in bigFivePuntajes){
        console.log('index',index,'ponderado',promedioPonderado(bigFivePuntajes[index],pesosBifive[index]))
        bigFiveJson[index]=promedioPonderado(bigFivePuntajes[index],pesosBifive[index])*100
    }
    console.log('bigFiveJson',bigFiveJson)
    return  bigFiveJson;
}

function sacarPesosAdjetivos(puntajesPersona:Comportamientos,tablaPuntajes:TablaPuntajes[]):BigFiveJsonP{
    let filtrados:TablaPuntajes[] = tablaPuntajes//.filter((fila)=> puntajesPersona[fila["Adjetivo"]] )
    let bigFiveJson:BigFiveJsonP ={            
        "amabilidad":[],
        "neuroticismo":[],
        "extraversión":[],
        "responsabilidad":[],
        "apertura":[]
    }
    filtrados.forEach((fila)=>{
       for(let factor in bigFiveJson){
            bigFiveJson[factor].push(inversionPuntaje( 1,fila[factor],{min:1,max:1}))
       }
    })
    return bigFiveJson
}
function promedioPonderado  (puntajesFactorizado:number[],pesos:number[]):number  { 
    console.log('puntajesFactorizado',puntajesFactorizado,'pesos',pesos)
    console.log(sumaFactores(puntajesFactorizado)/R.sum(pesos))
    let sumaPeso = R.sum(pesos) 
    let dividendo = sumaPeso == 0?1:sumaPeso
    return sumaFactores(puntajesFactorizado)/dividendo
    // const average = R.converge(R.divide, [R.sum, R.length])
    // average([1, 2, 3, 4, 5, 6, 7]) //=> 4
    // return Array.isArray(factor)?R.sum(factor):factor;
} 


export{generarBigFiveJohariPorcentaje,bifivePersonasPorcentajeFactores,bifivePersonasSumaFactores,UsuarioVentanaDeJohariBigFiveJson,BigFiveJson,generarBigFiveJohariSum,generarBigFiveJohari,bigfiveJohariPerson,bigfiveJohariEntorno,DataJohariEntorno,FactorBigfive,Persona_entorno,UsuarioVentanaDeJohariBigFive,sacarPuntajeBigFive,convertirPuntajeBigFiveInJson,inversionPuntaje}