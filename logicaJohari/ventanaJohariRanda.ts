import * as R from 'ramda'
type Zonas ={
    [key: string]: Map<string,number[]>
    zonaAbierta:Map<string,number[]>
    zonaCiega:Map<string,number[]>
    zonaOculta:Map<string,number[]>
    zonaDesconocida:Map<string,number[]>
}
type Zonasjson ={
    [key: string]: number[]
    zonaAbierta:number[]
    zonaCiega:number[]
    zonaOculta:number[]
    zonaDesconocida:number[]
}
type fila = {
    [key: string]: any
}
function calificadoresIguales(baseDeDatos:fila[],columnaEvaluador:string,columnaEvaluado:string):fila[]{
    return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] === calificacion[columnaEvaluado]);
 }
 function buscarOpinionesOtrosDeEsteEvaluado(baseDeDatos:fila[],nombreEvaluado:string,columnaEvaluado:string):fila[]{
     return baseDeDatos.filter(calificacion =>  calificacion[columnaEvaluado] === nombreEvaluado);
  }
 function calificadoresDistintos(baseDeDatos:fila[],columnaEvaluador:string,    columnaEvaluado:string):fila[]{
     return baseDeDatos.filter(calificacion => calificacion[columnaEvaluador] !== calificacion[columnaEvaluado]);
 }

 const criterioUnionPropiedadesIguales = (key:any, l:any, dato:any) => R.type(l)=== "Array"? l.concat( dato):[l].concat( dato) 
 const generarUnion = R.mergeDeepWithKey(criterioUnionPropiedadesIguales)
 type unionParecidos = {
    [key: string]: number[]
 }
function generarVentanaPersona(opinionPropiaUsuario:fila,opinionOtrosUsuario:unionParecidos|Partial<fila>):Zonas{
    let zonas:Zonas=  {
        zonaAbierta : new Map(),
        zonaCiega : new Map(),
        zonaOculta : new Map(),
        zonaDesconocida : new Map()
       }
    let coleccionador = opinionOtrosUsuario
    console.log('coleccionador',coleccionador)   
    // console.log('opinionPropiaUsuario',opinionPropiaUsuario)   
    const calificacion = new Set(Object.keys(coleccionador).concat(Object.keys(opinionPropiaUsuario))); // esto es para unir las llaves de los dos array y no queden repetidas   
    // console.log('calificacion',calificacion)
    for(let key of  calificacion){
        let k:string = key
        let suma = coleccionador[k] == undefined?0: R.sum([coleccionador[k]].flat());
        if(suma && opinionPropiaUsuario[k]){//si el usuario a puntuado esa caracteristica y al ser sumado tambien se a puntuado
            zonas.zonaAbierta.set(k,[coleccionador[k]].flat().concat(opinionPropiaUsuario[k]))
        } else if(!suma && opinionPropiaUsuario[k]){//El usuario lo puntuo pero el grupo no lo a puntado
            zonas.zonaOculta.set(k,[opinionPropiaUsuario[k]])
        } else if(suma && !opinionPropiaUsuario[k]){// El grupo lo puntuo pero el usuario no
            zonas.zonaCiega.set(k,[coleccionador[k]].flat())      
        } else{// ni el grupo ni la person lo puntua
            zonas.zonaDesconocida.set(k,coleccionador[k]==undefined?[opinionPropiaUsuario[k]]: [coleccionador[k]].flat().concat(opinionPropiaUsuario[k]||[]))
        }
     }
    return zonas
}

function convertirVentanaJohariJson(zonas:Zonas):Zonasjson{
    let ventanaJson:any = {}
    for(let key in zonas){
       ventanaJson[key] = {}
       zonas[key].forEach((element,index) => {
           ventanaJson[key][index] = element
       });
    }
   return ventanaJson
}
function seleccionarEntornos(dataTable:fila[],columnaEntorno:string):Map<string,any[]>{
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
export function columnasSeleccionar(columnasAnalizar:ColumnasAnalizar){
    return R.pick(columnasAnalizar.definirColumnasCalificaciones)
}
export function mostrarOpinionOtros(calificacionesEvaluado:fila[],columnasAnalizar:ColumnasAnalizar){
    let opinionOtros = calificadoresDistintos(calificacionesEvaluado,columnasAnalizar.definirColumnaEvaluador,columnasAnalizar.definirColumnaEvaluado)
    let functionopinionOtros =  R.pick(columnasAnalizar.definirColumnasCalificaciones);                
    let finOpinionOtros = opinionOtros.map((filaOpinionOtro)=> functionopinionOtros(filaOpinionOtro))
    console.log('finOpinionOtros',finOpinionOtros)
    if(finOpinionOtros.length){
        return finOpinionOtros.reduce((valorAntes,valorDespues)=> generarUnion(valorAntes,valorDespues))
    }else{
        return finOpinionOtros
    }
}
function convertirPropiedadesEnArray(fila:fila):fila{
    let convertido:fila  = {}
    for(let key in fila){
        convertido[key]= [fila[key]].flat()
    }
    return convertido
}
function clasificar(dataEntorno:any[],columnasAnalizar:ColumnasAnalizar,nombreEntornoIndex:string):DatosEntorno{
    let construccionData:DatosEntorno ={"personas_entorno":[],"nombre_entorno":""}
    
    // console.log('dataEntorno',dataEntorno)

    construccionData["nombre_entorno"] = nombreEntornoIndex;    
    // calificadoresIguales(dataEntorno,columnasAnalizar.definirColumnaEvaluador,columnasAnalizar.definirColumnaEvaluado)
    seleccionarEntornos(dataEntorno,'evaluado')
    .forEach((calificacionesEvaluado,nombreUsuario)=>{
        // console.log('calificacionesEvaluado',calificacionesEvaluado)
        // console.log(calificacionesEvaluado[columnasAnalizar.definirColumnaEvaluado],columnasAnalizar.definirColumnaEvaluado)
        // console.log('calificacionDistintas',calificacionDistintas)
        let opinionOtrosUnido = mostrarOpinionOtros(calificacionesEvaluado,columnasAnalizar)
        console.log('opinionOtrosUnido',opinionOtrosUnido)
        let opinionOtrosUnidoConvertPropiedadesArray = convertirPropiedadesEnArray(opinionOtrosUnido)
        let usuarioDatos = calificadoresIguales(calificacionesEvaluado,columnasAnalizar.definirColumnaEvaluador,columnasAnalizar.definirColumnaEvaluado)
        console.log('usuarioDatos',usuarioDatos)        
        let Rusuario = usuarioDatos.length?R.pick(columnasAnalizar.definirColumnasCalificaciones,usuarioDatos[0]):usuarioDatos
        console.log('Rusuario',Rusuario)
        let RusuarioConvertArrayPropiedades = convertirPropiedadesEnArray(Rusuario)
        let ventanajohariUsuario = {
            "nombre usuario":nombreUsuario,
            "ventana de johari":convertirVentanaJohariJson(generarVentanaPersona(Rusuario,opinionOtrosUnidoConvertPropiedadesArray)),
            "opinion propia":RusuarioConvertArrayPropiedades,
            "opinion otros":opinionOtrosUnidoConvertPropiedadesArray
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

type ColumnasAnalizar={
    definirColumnaEntorno:string,// es el nombre del lugar donde se hace la prueba(empresa, familia, colegio , grupo)
    definirColumnaFecha:string,
    definirColumnaEvaluado:string,
    definirColumnaEvaluador:string,
    definirColumnasCalificaciones:string[],
}
export class VentanaJohariRanda{
    private columnasAnalizar:ColumnasAnalizar
    public entornos:Map<string,any[]>
    constructor(columnasAnalizar:ColumnasAnalizar){
        this.columnasAnalizar = columnasAnalizar        
    }

   public analizar(dataTable:fila[]):DatosEntorno[]{// es un array que contiene json
        let columnasAnalizar:ColumnasAnalizar = this.columnasAnalizar
        let columnaEntorno:string = this.columnasAnalizar.definirColumnaEntorno
        let entornos:Map<string,any[]> = seleccionarEntornos(dataTable,columnaEntorno);
        this.entornos =  entornos
        let coleccionEntornos:DatosEntorno[] = []
        entornos.forEach((dataEntorno,nombreEntornoIndex)=>{ 
            let construccionData:DatosEntorno = clasificar(dataEntorno,columnasAnalizar,nombreEntornoIndex);        
            coleccionEntornos.push(construccionData)
        })
        return coleccionEntornos;
    }
    public getEntornos(){
        return this.entornos
    }
}

export{generarVentanaPersona,seleccionarEntornos,ColumnasAnalizar,fila,DatosEntorno}