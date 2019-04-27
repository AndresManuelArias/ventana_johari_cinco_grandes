const R = require('ramda');
type Zonas ={
    [key: string]: Map<string,number[]>
    zonaAbierta:Map<string,number[]>
    zonaCiega:Map<string,number[]>
    zonaOculta:Map<string,number[]>
    zonaDesconocida:Map<string,number[]>
}

function calificadoresIguales(baseDeDatos:any[],columnaEvaluador:string,columnaEvaluado:string){
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] === calificacion[columnaEvaluado]);
 }
 function buscarOpinionesOtrosDeEsteEvaluado(baseDeDatos:any[],nombreEvaluado:string,columnaEvaluado:string){
     return baseDeDatos.filter(calificacion =>  calificacion[columnaEvaluado] === nombreEvaluado);
  }
 function calificadoresDistintos(baseDeDatos:any[],columnaEvaluador:string,    columnaEvaluado:string){
     return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] !== calificacion[columnaEvaluado]);
 }

 
function generarVentanaPersona(opinionPropiaUsuario:any,opinionOtrosUsuario:any[]):Zonas{
    let zonas:Zonas=  {
        zonaAbierta : new Map(),
        zonaCiega : new Map(),
        zonaOculta : new Map(),
        zonaDesconocida : new Map()
       }
    let criterio = (k:any, l:any, r:any) => R.type(l)=== "Array"? l.concat( r):[l].concat( r) 
    let generarUnion = R.mergeDeepWithKey(criterio)
    let coleccionador:any = {}
    opinionOtrosUsuario.forEach((values)=>{
     coleccionador = generarUnion(coleccionador,values) 
    })
    console.log('coleccionador',coleccionador)   
    for(let key in  coleccionador){
        let suma = R.sum( coleccionador[key])  
        if(suma && opinionPropiaUsuario[key]){//si el usuario a puntuado esa caracteristica y al ser sumado tambien se a puntuado
            zonas.zonaAbierta.set(key,coleccionador[key].concat(opinionPropiaUsuario[key]))
        } else if(!suma && opinionPropiaUsuario[key]){//El usuario lo puntuo pero el grupo no lo a puntado
            zonas.zonaOculta.set(key,opinionPropiaUsuario[key])
        } else if(suma && !opinionPropiaUsuario[key]){// El grupo lo puntuo pero el usuario no
            zonas.zonaCiega.set(key,coleccionador[key])      
        } else{// ni el grupo ni la person lo puntua
            zonas.zonaDesconocida.set(key,coleccionador[key].concat(opinionPropiaUsuario[key]))
        }
     }
    return zonas
}

function convertirVentanaJohariJson(zonas:Zonas){
    let ventanaJson:any = {}
    for(let key in zonas){
       ventanaJson[key] = {}
       zonas[key].forEach((element,index) => {
           ventanaJson[key][index] = element
       });
    }
   return ventanaJson
}
function seleccionarEntornos(dataTable:any[],columnaEntorno:string):Map<string,any[]>{
    let entornos:Map<string,any[]> = new Map()
    dataTable.forEach((fila)=>{
       if(entornos.has(fila[columnaEntorno])){
        entornos.get(fila[columnaEntorno]).push(fila)
       }else{
        entornos.set(fila[columnaEntorno],[fila]) 
       }
    })
    return entornos
}
type DatosEntorno ={
    "personas_entorno":any[]
    "nombre_entorno":string
}
function clasificar(dataEntorno:any[],columnasAnalisar:ColumnasAnalisar,nombreEntornoIndex:string):DatosEntorno{
    let construccionData:DatosEntorno ={"personas_entorno":[],"nombre_entorno":""}
    
    // console.log('dataEntorno',dataEntorno)
    let calificacionDistintas = calificadoresDistintos(dataEntorno,columnasAnalisar.definirColumnaEvaluador,columnasAnalisar.definirColumnaEvaluado)
    // // console.log('calificacionDistintas',calificacionDistintas)
    construccionData["nombre_entorno"] = nombreEntornoIndex;    
    calificadoresIguales(dataEntorno,columnasAnalisar.definirColumnaEvaluador,columnasAnalisar.definirColumnaEvaluado).forEach((usuario)=>{
        // console.log(usuario[columnasAnalisar.definirColumnaEvaluado],columnasAnalisar.definirColumnaEvaluado)
        let functionopinionOtros =  R.pick(columnasAnalisar.definirColumnasCalificaciones);                
        let opinionOtros = buscarOpinionesOtrosDeEsteEvaluado(calificacionDistintas,usuario[columnasAnalisar.definirColumnaEvaluado],columnasAnalisar.definirColumnaEvaluado)
        let finOpinionOtros = opinionOtros
        .map((filaOpinionOtro)=> functionopinionOtros(filaOpinionOtro))
        // console.log('finOpinionOtros',finOpinionOtros)
        let Rusuario = R.pick(columnasAnalisar.definirColumnasCalificaciones,usuario)
        let ventanajohariUsuario = {
            "nombre usuario":usuario[columnasAnalisar.definirColumnaEvaluado],
            "ventana de johari":convertirVentanaJohariJson(generarVentanaPersona(Rusuario,finOpinionOtros)),
            "opinion propia":Rusuario,
            "opinion otros":finOpinionOtros
        }
        
        construccionData["personas_entorno"].push(ventanajohariUsuario)
    })
    return construccionData
}
/*
[ zonaAbierta ,
 zonaCiega ,
 zonaOculta ,
 zonaDesconocida ]*/
type ColumnasAnalisar={
    definirColumnaEntorno:string,
    definirColumnaFecha:string,
    definirColumnaEvaluado:string,
    definirColumnaEvaluador:string,
    definirColumnasCalificaciones:string[],
}
export class VentanaJohariRanda{
    private columnasAnalisar:ColumnasAnalisar
    public entornos:Map<string,any[]>
    constructor(columnasAnalisar:ColumnasAnalisar){
        this.columnasAnalisar = columnasAnalisar        
    }
    analisar(dataTable:any[]){
        let columnasAnalisar:ColumnasAnalisar = this.columnasAnalisar
        let columnaEntorno:string = this.columnasAnalisar.definirColumnaEntorno
        let entornos:Map<string,any[]> = seleccionarEntornos(dataTable,columnaEntorno);
        this.entornos =  entornos
        let coleccionEntornos:any = []
        entornos.forEach((dataEntorno,nombreEntornoIndex)=>{ 
            let construccionData:DatosEntorno = clasificar(dataEntorno,columnasAnalisar,nombreEntornoIndex);        
            coleccionEntornos.push(construccionData)
        })
        return coleccionEntornos;
    }
    getEntornos(){
        return this.entornos
    }
}

export{generarVentanaPersona,seleccionarEntornos}