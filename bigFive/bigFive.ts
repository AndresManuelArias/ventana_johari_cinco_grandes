// este solo recive los adjetivos
import * as R from 'ramda'
var jStat = require('jStat').jStat;
type EscalaPuntaje ={
    max:number,
    min:number
}
function darPeso(puntaje:number,asignacionPuntaje:number,escalaPuntaje:EscalaPuntaje):number{
   return puntaje *asignacionPuntaje
}
function inversionPuntaje(puntaje:number,asignacionPuntaje:number,escalaPuntaje:EscalaPuntaje):number{
    let puntajeFinal:number=puntaje * Math.abs(asignacionPuntaje) // el problema de esta formula es que aumenta la diferencia entre numeros pequeños y los numeros grandes
    if(asignacionPuntaje < 0 && puntaje >= escalaPuntaje.min  ){
        // console.log('resta puntaje',escalaPuntaje.max - puntajeFinal)
        // asignacionPuntaje = 1 -Math.abs(asignacionPuntaje)
        puntajeFinal = escalaPuntaje.max - puntajeFinal
    }
    // console.log('multiplicacion puntaje',escalaPuntaje.max - puntaje)

    return puntajeFinal 
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
type Comportamientos = {
    [key: string]: number[]
}
type Operacion ={
    dominio:string
    rango?:string
}
function sacarPuntajeBigFive(puntajesPersona:Comportamientos, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje,operacion?:Operacion):Map<string,number[]>{
    let scoreBigfive:Map<string,number[]> = new Map();
    tablaPuntajes.forEach((fila)=>{// aqui se encuentra la valoracion o el peso que tiene cada adjetivo
        console.log(fila["Adjetivo"])
        if(puntajesPersona[fila["Adjetivo"]]){// en un futuro el promedio puede ser una Media Aritmética Ponderada, donde se le da mas peso a la calificacion realizada por un psicologo
            let puntajeMean = operacion ==undefined? JSON.parse(`{"${fila["Adjetivo"]}":[${puntajesPersona[fila["Adjetivo"]]}]}`): Array.isArray(puntajesPersona[fila["Adjetivo"]])? jStat[operacion ==undefined?'mean':operacion.dominio](puntajesPersona[fila["Adjetivo"]]):puntajesPersona[fila["Adjetivo"]]// se verifica la calificacion de cada adjetivo y se saca un promedio si esta es mayor a uno
            console.log('puntajeMean',puntajeMean)
            let bigFive:string[] = ["amabilidad",
                "neuroticismo",
                "extraversión",
                "responsabilidad",
                "apertura"]
            bigFive.forEach(factor => {   
                if(scoreBigfive.has(factor)) {    //una coleccion que tiene valor de 0, es por que ese abjetivo tiene un valor de cero en un factor pero no en otros factores
                    let puntajeFactor:number=  Number(fila[factor])

                    // console.log('puntajeMean',puntajeMean,'Adjetivo',fila["Adjetivo"],'inversionPuntaje',puntajeFactor,'fila[factor]',fila[factor],factor,inversionPuntaje( puntajeMean,puntajeFactor,escalaPuntaje))
                    scoreBigfive.get(factor).push(operacion ==undefined ?puntajeMean:darPeso( puntajeMean,puntajeFactor,escalaPuntaje))
                }else{
                    scoreBigfive.set(factor, [operacion ==undefined ?puntajeMean:darPeso( puntajeMean,fila[factor],escalaPuntaje)]) 
                }    
            });         
        }    
    })
    console.log('operacion',operacion)
    if(operacion !== undefined && operacion.rango !== undefined){
        scoreBigfive.forEach((factores,key)=>{
            scoreBigfive.set(key, jStat[operacion.rango](factores))
        })
        console.log('scoreBigfive operacion',scoreBigfive)
    }
    return scoreBigfive;
}
type BigFiveJson = {
    [key: string]: number|number[]
"amabilidad":number|number[]
"neuroticismo":number|number[]
"extraversión":number|number[]
"responsabilidad":number|number[]
"apertura":number|number[]
}
function convertirPuntajeBigFiveInJson(resultadoBigFive:Map<string,number[]>):any|BigFiveJson{
    // let bigFiveJson:BigFiveJson ={            
    //     "amabilidad":null,
    //     "neuroticismo":null,
    //     "extraversión":null,
    //     "responsabilidad":null,
    //     "apertura":null
    // }
    // for (var [clave, valor] of resultadoBigFive) {
    //     bigFiveJson[clave] = valor
    //   } 
    // return bigFiveJson;
    let bigFiveJson:any|BigFiveJson = Object.fromEntries(resultadoBigFive)
    return bigFiveJson
}

function sacarPuntajeBigFiveJson(puntajesPersona:Comportamientos, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje,operacion?:Operacion):BigFiveJson{
    return convertirPuntajeBigFiveInJson(sacarPuntajeBigFive(puntajesPersona ,tablaPuntajes,escalaPuntaje,operacion))
}
function sacarPuntajeBigFiveJsonArray(puntajesPersonas:Comportamientos[], tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje,operacion?:Operacion):BigFiveJson[]{
    return puntajesPersonas.map((puntajesPersona)=>{
       return sacarPuntajeBigFiveJson(puntajesPersona, tablaPuntajes,escalaPuntaje,operacion)
    })
}
export class BigFive {
    private tablaPuntajes:TablaPuntajes[]
    private escalaPuntaje:EscalaPuntaje
    private operacion:Operacion
    constructor( tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje,operacion:Operacion){
        this.tablaPuntajes = tablaPuntajes;
        this.escalaPuntaje = escalaPuntaje;
        this.operacion = operacion;
    }
    public sacarPuntajeBigFive(puntajesPersona:Comportamientos):Map<string,number[]>{
       return  sacarPuntajeBigFive(puntajesPersona, this.tablaPuntajes,this.escalaPuntaje,this.operacion)
    }
    public sacarPuntajeBigFiveJson(puntajesPersona:Comportamientos):BigFiveJson{
    return sacarPuntajeBigFiveJson(puntajesPersona,this.tablaPuntajes,this.escalaPuntaje,this.operacion)
    }
    public sacarPuntajeBigFiveJsonArray(puntajesPersonas:Comportamientos[]):BigFiveJson[]{
       return sacarPuntajeBigFiveJsonArray(puntajesPersonas,this.tablaPuntajes,this.escalaPuntaje,this.operacion)
    }
}

export{TablaPuntajes,EscalaPuntaje,Operacion,convertirPuntajeBigFiveInJson,sacarPuntajeBigFiveJson,sacarPuntajeBigFiveJsonArray}