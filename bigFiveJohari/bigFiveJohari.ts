interface Zona {
    comportamiento:string
    puntaje:number
}

interface VentanaDeJohari{
    [key: string]: any
    'abierta':Zona[]
    'ciega':Zona[]
    'oculta':Zona[]
    'desconocida':Zona[]
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
    apertura:string[]
    noApertura:string[]
    extroversion:string[]
    introversion:string[]
    obedienciaNormas:string[]
    noObedienciaNormas:string[]
    neuroticismo:string[]
    noNeurotismo:string[]
    noAmable:string[]
    amable:string[]
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
                console.log('zona',zona,'elementZona',elementZona,'factor',factor)
                ventanaDeJohariBigFive[zona][factor]['colection'].push(elementZona)
            }     
        });
        let cantidadPuntajes:any[] = ventanaDeJohariBigFive[zona][factor]['colection'].length
        console.log('cantidadPuntajes',cantidadPuntajes)
        ventanaDeJohariBigFive[zona][factor]['score'] =cantidadPuntajes?ventanaDeJohariBigFive[zona][factor]['colection'].map((objetc:Zona)=> objetc.puntaje).reduce((puntajeA:number,puntajeB:number)=>puntajeA+puntajeB):0;
    }   
  }
  return {    'nombre usuario':persona_entorno['nombre usuario'],    ventanaDeJohariBigFive:ventanaDeJohariBigFive }  
}
function bigfiveJohariEntorno(factorBigfive:FactorBigfive,dataJohariEntorno:DataJohariEntorno):UsuarioVentanaDeJohariBigFive[]{
   return dataJohariEntorno.personas_entorno.map((personaEntorno)=>  bigfiveJohariPerson(factorBigfive,personaEntorno))
}

export{bigfiveJohariPerson,bigfiveJohariEntorno,DataJohariEntorno,FactorBigfive,Persona_entorno,UsuarioVentanaDeJohariBigFive}