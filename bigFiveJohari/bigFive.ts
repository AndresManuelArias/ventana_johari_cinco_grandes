// este solo recive los adjetivos
var jStat = require('jStat').jStat;
type EscalaPuntaje ={
    max:number,
    min:number
}
function inversionPuntaje(puntaje:number,asignacionPuntaje:number,escalaPuntaje:EscalaPuntaje){
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
type operacion ={
    dominio:string
    rango?:string
}
function sacarPuntajeBigFive(puntajesPersona:Comportamientos, tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje,operacion:operacion):Map<string,number[]>{
    let scoreBigfive:Map<string,number[]> = new Map();
    tablaPuntajes.forEach((fila)=>{// aqui se encuentra la valoracion o el peso que tiene cada adjetivo
        console.log(fila["Adjetivo"])
        if(puntajesPersona[fila["Adjetivo"]]){// en un futuro el promedio puede ser una Media Aritmética Ponderada, donde se le da mas peso a la calificacion realizada por un psicologo
            let puntajeMean = Array.isArray(puntajesPersona[fila["Adjetivo"]])? jStat[operacion.dominio](puntajesPersona[fila["Adjetivo"]]):puntajesPersona[fila["Adjetivo"]]// se verifica la calificacion de cada adjetivo y se saca un promedio si esta es mayor a uno
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
                    scoreBigfive.get(factor).push(inversionPuntaje( puntajeMean,puntajeFactor,escalaPuntaje))
                }else{
                    scoreBigfive.set(factor, [inversionPuntaje( puntajeMean,fila[factor],escalaPuntaje)]) 
                }    
            });         
        }    
    })
    console.log('operacion',operacion)
    if(operacion.rango !== undefined){
        scoreBigfive.forEach((factores,key)=>{
            scoreBigfive.set(key, jStat[operacion.rango](factores))
        })
        console.log('scoreBigfive operacion',scoreBigfive)
    }
    return scoreBigfive;
}

export class BigFive {
    private tablaPuntajes:TablaPuntajes[]
    private escalaPuntaje:EscalaPuntaje
    private operacion:operacion
    constructor( tablaPuntajes:TablaPuntajes[],escalaPuntaje:EscalaPuntaje,operacion:operacion){
        this.tablaPuntajes = tablaPuntajes;
        this.escalaPuntaje = escalaPuntaje;
        this.operacion = operacion;
    }
    public sacarPuntajeBigFive(puntajesPersona:Comportamientos):Map<string,number[]>{
       return  sacarPuntajeBigFive(puntajesPersona, this.tablaPuntajes,this.escalaPuntaje,this.operacion)
    }
}