const csvdata = require('csvdata');
const fs = require('fs');
// @ts-check 



function calificadoresIguales(array){
    return array.filter(calificacion => calificacion.evaluador === calificacion.evaluado);
 }
 function buscarOpinionesOtrosDeEsteEvaluado(array,nombreEvaluado){
     return array.filter(calificacion =>  calificacion.evaluado === nombreEvaluado);
  }
 function calificadoresDistintos(array){
     return array.filter(calificacion => calificacion.evaluador !== calificacion.evaluado);
 }


 function agrupacionPuntajes(opinonPropia,opinionesOtros){
    // console.log(opinonPropia)
   let coleccionAgrupacionPuntajes = [];
   opinionesOtros.forEach((opinion)=>{
    //    console.log(Object.keys(opinion))
    /*    console.log(opinonPropia.propiedad,opinonPropia.calificacion , 
     opinion[opinonPropia.propiedad])*/
       coleccionAgrupacionPuntajes.push(opinion[opinonPropia.propiedad]);
    });
    return {comportamiento:opinonPropia.propiedad,puntaje:coleccionAgrupacionPuntajes};
}
function quitarUnaParteDelJson(jsonCalificacion,arrayFiltro){
    // console.log(jsonCalificacion);
    let calificacionMostrar = jsonCalificacion;
    arrayFiltro.forEach(function(elementoQuitar) {
        // console.log( elementoQuitar);
        for( let dato in  jsonCalificacion){
            // console.log(dato)
            if( dato == elementoQuitar){
               delete  calificacionMostrar[dato] ;
            }
        }
    }, this);
    return calificacionMostrar;
}


function agruparOpinionPropiaConOtros(opinionPropia,opinionOtros){
    let coleccionUsuarios = [];
    opinionPropia.forEach((usuario)=>{
       let agrupacionPuntajesUsuario =  {usuario:usuario.evaluado,puntajesPropios:[],puntajesOtros:[]};
       let opinionOtrosEsteEvaluado =   buscarOpinionesOtrosDeEsteEvaluado(opinionOtros,usuario.evaluado);
        //   console.log(opinionOtrosEsteEvaluado);
        let tranformaUsuario = usuario;
       let calificacionesPropia =   quitarUnaParteDelJson(tranformaUsuario,['evaluador','evaluado','fecha','entorno']);
    //    console.log(calificacionesPropia);
       for(let calificacion in  calificacionesPropia){
            agrupacionPuntajesUsuario
                .puntajesPropios
                    .push({comportamiento:calificacion,puntaje:calificacionesPropia[calificacion]});
            agrupacionPuntajesUsuario
                .puntajesOtros
                    .push(agrupacionPuntajes({
                        calificacion:calificacionesPropia[calificacion],
                        propiedad:calificacion}, opinionOtrosEsteEvaluado));
       }
    //    console.log(agrupacionPuntajesUsuario);
       coleccionUsuarios.push(agrupacionPuntajesUsuario);
   });
   return coleccionUsuarios;
}



function zonaAbierta(arrayPuntajesPropios, arrayPuntajerOtros){
   let puntajePropio =  arrayPuntajesPropios.puntaje;
   let puntajeOtros = arrayPuntajerOtros.reduce( (datoAnterio,datoAhora) => datoAnterio+datoAhora);
//    console.log(puntajeOtros,puntajePropio,arrayPuntajerOtros)
    let promedioPuntaje = (puntajePropio+puntajeOtros)/(arrayPuntajerOtros.length+1);
   return { resultado : puntajePropio > 0 && puntajeOtros > 0 , puntaje: promedioPuntaje};
}
function zonaCiega(arrayPuntajesPropios, arrayPuntajerOtros){
    let puntajePropio =  arrayPuntajesPropios.puntaje;
    let puntajeOtros = arrayPuntajerOtros.reduce( (datoAnterio,datoAhora) => datoAnterio+datoAhora);
 //    console.log(puntajeOtros,puntajePropio)
     let promedioPuntaje = (puntajePropio+puntajeOtros)/(arrayPuntajerOtros.length+1);
    return { resultado : puntajePropio === 0 && puntajeOtros > 0 , puntaje: promedioPuntaje};
}

function zonaOculta(arrayPuntajesPropios, arrayPuntajerOtros){
    let puntajePropio =  arrayPuntajesPropios.puntaje;
    let puntajeOtros = arrayPuntajerOtros.reduce( (datoAnterio,datoAhora) => datoAnterio+datoAhora);
 //    console.log(puntajeOtros,puntajePropio)
     let promedioPuntaje = (puntajePropio+puntajeOtros)/(arrayPuntajerOtros.length+1);
    return { resultado : puntajePropio > 0 && puntajeOtros === 0 , puntaje: promedioPuntaje};
}
function zonaDesconocida(arrayPuntajesPropios, arrayPuntajerOtros){
    let puntajePropio =  arrayPuntajesPropios.puntaje;
    let puntajeOtros = arrayPuntajerOtros.reduce( (datoAnterio,datoAhora) => datoAnterio+datoAhora);
 //    console.log(puntajeOtros,puntajePropio)
     let promedioPuntaje = (puntajePropio+puntajeOtros)/(arrayPuntajerOtros.length+1);
    return { resultado : puntajePropio === 0 && puntajeOtros === 0 , puntaje: promedioPuntaje};
}

function agruparDatosCadaZona(organizacionUsuarioCalificaciones) {
    let usuarios = [];
    // console.log(organizacionUsuarioCalificaciones);
    organizacionUsuarioCalificaciones.forEach((usuario)=>{
        let personalidad =   {};
        personalidad['nombre usuario'] = usuario.usuario;
        personalidad['ventana de johari'] = {
            'abierta':[],
            'ciega':[],
            'oculta':[],
            'desconocida':[]
        };
        // console.log(usuario);
        usuario.puntajesPropios.forEach((observacionPropia)=>{
            // console.log(observacionPropia)
            let observacionComportamientosDeOtros = usuario
                                                        .puntajesOtros
                                                        .filter((observacionOtros)=> observacionOtros.comportamiento === observacionPropia.comportamiento );
            let respuestaZonaAbierta = zonaAbierta(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
            // console.log(respuestaZonaAbierta)
            if( respuestaZonaAbierta.resultado) { 
                personalidad['ventana de johari']
                    .abierta.push({
                        comportamiento:observacionPropia.comportamiento,
                        puntaje:respuestaZonaAbierta.puntaje});
                // console.log(observacionComportamientosDeOtros,observacionPropia );
            }
            let respuestaZonaCiega = zonaCiega(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
            // console.log(respuestaZonaAbierta)
            if( respuestaZonaCiega.resultado) { 
                personalidad['ventana de johari']
                    .ciega.push({comportamiento:observacionPropia.comportamiento,puntaje:respuestaZonaCiega.puntaje});
                // console.log(observacionComportamientosDeOtros,observacionPropia );
            }
            let respuestaZonaOculta = zonaOculta(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
            // console.log(respuestaZonaAbierta)
            if( respuestaZonaOculta.resultado) { 
                personalidad['ventana de johari']
                    .oculta.push({
                        comportamiento:observacionPropia.comportamiento,
                        puntaje:respuestaZonaOculta.puntaje
                    });
                // console.log(observacionComportamientosDeOtros,observacionPropia );
            }
            let respuestaZonaDesconocida = zonaDesconocida(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
            // console.log(respuestaZonaAbierta)
            if( respuestaZonaDesconocida.resultado) { 
                personalidad['ventana de johari']
                    .desconocida
                    .push({comportamiento:observacionPropia.comportamiento,puntaje:respuestaZonaDesconocida.puntaje});
                // console.log(observacionComportamientosDeOtros,observacionPropia );
            }
            
        });
        usuarios.push(personalidad);
    });
    return usuarios;
}
function ventanaJohari(array){
    let opinionPropiaDeUsuario = calificadoresIguales(array);
    let opinionOtros = calificadoresDistintos(array);
    //  console.log(opinionOtros)
    let organizacionUsuarioCalificaciones = agruparOpinionPropiaConOtros(opinionPropiaDeUsuario,opinionOtros);
    let resultadoVentanaHonary =  agruparDatosCadaZona(organizacionUsuarioCalificaciones);
    // resultadoVentanaHonary.forEach((usuario)=>{
    //     console.log(usuario['nombre usuario'],usuario['ventana de johari']);
    // });
    return resultadoVentanaHonary;
}
function coleccionadorEntornos(){
    let memoria = [];
    return(datoNuevo)=>{
        if(!memoria.some(coleccion => coleccion === datoNuevo)){
            memoria.push(datoNuevo);
        }
        return memoria;
    };
}
function encontrarEntornos(array){
    let separadoPorentornos = coleccionadorEntornos();
    let entornos;
    array.forEach((fila)=>{
        entornos = separadoPorentornos(fila.entorno);
    });
    return entornos;
}
function separarEntornos(array){
    let entornosSeparados = [];
    let entornos = encontrarEntornos(array);
    entornos.forEach((nombreLugar)=>{
        entornosSeparados.push({
            nombreEntorno:nombreLugar,
            resultados:array.filter(fila =>  fila.entorno === nombreLugar  )
        });
    });
    console.log(entornosSeparados);
    return entornosSeparados;
}
function ventanaJohariEntornosCeparados(array){
    let entornosSeparados = separarEntornos(array);
    let arrayEntornos = [];
    entornosSeparados.forEach((entorno)=>{
        let jsonEntorno = {};
        jsonEntorno.nombre_entorno = entorno.nombreEntorno;
        jsonEntorno.personas_entorno =  ventanaJohari(entorno.resultados);
        arrayEntornos.push(jsonEntorno);
    });
    return arrayEntornos;
}
/*
csvdata.load('base_datos/ventana de johari (respuestas) - tabulacion comportamientos.csv', {
    delimiter: ',',
    log: true,
    objName: false,
    stream: false
  }).then((data) =>{ 
      //console.log(data);
      //zona ciega

    // console.log(calificadoresDistintos(data));
    ventanaJohari(data);
});
*/

function convertirColumnajohari(optionJohari,arrayConvert){
    let newArray = [];
    arrayConvert.forEach((fila)=>{
        let calificaciones = new Object();
        optionJohari.calificaciones.forEach((nombreCalificacion)=>{
            calificaciones[nombreCalificacion]  = fila[nombreCalificacion];
        });
        calificaciones.fecha = fila[optionJohari.fecha];
        calificaciones.entorno = fila[optionJohari.entorno];
        calificaciones.evaluado = fila[optionJohari.evaluado];
        calificaciones.evaluador = fila[optionJohari.evaluador];
        newArray.push(calificaciones);
    });
    return newArray;
}
class VentanaJohari {
    load(dirreccionSacarDatos,optionCVS){
        this.dirreccionSacarDatos=dirreccionSacarDatos;
        this.optionCVS = optionCVS;
    }
    definirColumnaEntorno(entorno){
        this.entorno = entorno;
    }
    definirColumnaEvaluado(evaluado){
        this.evaluado = evaluado;
    }
    definirColumnaEvaluador(evaluador){
        this.evaluador = evaluador;
    }
    definirColumnaFecha(fecha){
        this.fecha = fecha;
    }
    definirColumnasCalificaciones(calificaciones){
        this.calificaciones =calificaciones;
    }
    definirLugarGuardaResultado(lugarGuardarResultado){
        this.lugarGuardarResultado = lugarGuardarResultado;
    }
    crearJsonDeOpciones(){
        this.option = {
            fecha:this.fecha,
            entorno:this.entorno,
            evaluado:this.evaluado,
            evaluador:this.evaluador,
            calificaciones:this.calificaciones,
            lugarGuardarResultado:this.lugarGuardarResultado
        };
    }
    ejecutarPrograma(){
        return new Promise((resolve)=>{
            csvdata.load(this.dirreccionSacarDatos, this.optionCVS).then((data)=>{
                // console.log(data)
               let datosConvertidos = convertirColumnajohari(this.option,data);          
               let resultadoVentanaHonary = ventanaJohariEntornosCeparados(datosConvertidos);
               fs.writeFileSync(this.option.lugarGuardarResultado,JSON.stringify(resultadoVentanaHonary));
               resolve(resultadoVentanaHonary);
            },this);
        });
    }
}



module.exports = new VentanaJohari();
// let datosAnalizados = {
//     usuarios:[
//         {
//         'nombre usuario':'',
//         'ventana de johari':{
//                             'abierta':[{comportamiento:'',puntaje:0}],
//                             'ciega':[{comportamiento:'',puntaje:0}],
//                             'oculta':[{comportamiento:'',puntaje:0}],
//                             'desconocida':[{comportamiento:'',puntaje:0}]
//                             }
//         }
//     ]
// };