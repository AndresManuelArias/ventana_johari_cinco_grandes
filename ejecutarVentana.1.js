//ejecutar ventana

const {VentanaJohariRanda,generarVentanaPersona} = require('./logicaJohari/ventanaJohariRanda');
const csvdata = require('csvdata');
const fs = require('fs');
// const graficaJohariTablas = require('./view/graficaJohariTablas');

// @ts-check 


csvdata.load('data_base/ventana de johari (respuestas)  - tabulacion comportamientos.csv', {
  delimiter: ',',
  log: true,
  objName: false,
  stream: false
}).then((data) =>{ 
    // console.log(data);
    //zona ciega
    let ventanaJohariRanda = new  VentanaJohariRanda(
     { definirColumnaEntorno:'entorno',
definirColumnaFecha:'Marca temporal',
definirColumnaEvaluado:'evaluado',
definirColumnaEvaluador:'evaluador',
definirColumnasCalificaciones:['impaciente',
       'cobarde',	'alegre',	'enérgico',	'caótico',	'lógico',	'inmaduro',	
       'audaz',	'protector',	'irrespetuoso',	'insensible',	'hostil',	
       'cariñoso',	'irresponsable',	'curioso',	'dramatico',	'jactancioso',	
       'callado',	'generoso',	'presumido',	'espontáneo',	'aburrido',	
       'atento',	'mezquino',	'indiferente',	'valiente',	'charlatán',	
       'erudito',	'envidioso',	'prepotente',	'inseguro',	'listo',	'modesto',	
       'sombrio',	'amigable',	'desconfiado',	'reflexivo',	'tímido',	'egoísta',	
       'temerario',	'tonto',	'mandón',	'rencoroso',	'ignorante',	'simpático',	
       'amable',	'imprudente',	'vulgar',	'pesimista',	'inquieto',	'ingenuo',	'terco',	
       'irracional',	'previsible',	'extrovertido',	'débil',	'violento',	'pasivo',	
       'físgón',	'tenso',	'relajado',	'sensible',	'frío',	'orgulloso',	'tranquilo',	
       'flexible',	'maduro',	'feliz',	'distante']
    }
    )
  let resultadoVentanaHonary =   ventanaJohariRanda.analisar(data)
  // console.log(ventanaJohariRanda.getEntornos());
  // console.log(ventanaJohariRanda.getEntornos().keys())
  fs.writeFileSync('data_base/ventanaDeHonaryPrueba.json',JSON.stringify(resultadoVentanaHonary));
  

  let usuario = 
    {"impaciente":0,"cobarde":0,"alegre":0,"enérgico":0,"caótico":0,"lógico":0,"inmaduro":0,"audaz":0,"protector":1,"irrespetuoso":0,"insensible":0,"hostil":0,"cariñoso":0,"irresponsable":0,"curioso":0,"dramatico":0,"jactancioso":1,"callado":0,"generoso":0,"presumido":0,"espontáneo":0,"aburrido":0,"atento":0,"mezquino":0,"indiferente":0,"valiente":0,"charlatán":0,"erudito":0,"envidioso":0,"prepotente":0,"inseguro":0,"listo":0,"modesto":0,"sombrio":0,"amigable":0,"desconfiado":0,"reflexivo":0,"tímido":0,"egoísta":0,"temerario":0,"tonto":0,"mandón":0,"rencoroso":0,"ignorante":0,"simpático":0,"amable":0,"imprudente":1,"vulgar":0,"pesimista":1,"inquieto":0,"ingenuo":0,"terco":1,"irracional":0,"previsible":0,"extrovertido":0,"débil":0,"violento":0,"pasivo":0,"físgón":0,"tenso":0,"relajado":0,"sensible":0,"frío":0,"orgulloso":0,"tranquilo":0,"flexible":1,"maduro":0,"feliz":0,"distante":0}
  let dataPrueba = [
    {"impaciente":0,"cobarde":0,"alegre":0,"enérgico":0,"caótico":0,"lógico":0,"inmaduro":0,"audaz":0,"protector":0,"irrespetuoso":0,"insensible":0,"hostil":0,"cariñoso":0,"irresponsable":0,"curioso":0,"dramatico":0,"jactancioso":0,"callado":0,"generoso":0,"presumido":0,"espontáneo":0,"aburrido":0,"atento":0,"mezquino":0,"indiferente":0,"valiente":1,"charlatán":0,"erudito":0,"envidioso":0,"prepotente":0,"inseguro":0,"listo":1,"modesto":0,"sombrio":0,"amigable":0,"desconfiado":0,"reflexivo":1,"tímido":0,"egoísta":1,"temerario":0,"tonto":0,"mandón":0,"rencoroso":0,"ignorante":0,"simpático":0,"amable":0,"imprudente":0,"vulgar":0,"pesimista":0,"inquieto":1,"ingenuo":0,"terco":0,"irracional":0,"previsible":0,"extrovertido":0,"débil":0,"violento":0,"pasivo":0,"físgón":0,"tenso":0,"relajado":0,"sensible":0,"frío":0,"orgulloso":0,"tranquilo":0,"flexible":1,"maduro":0,"feliz":0,"distante":0},
    {"impaciente":0,"cobarde":0,"alegre":1,"enérgico":0,"caótico":0,"lógico":0,"inmaduro":0,"audaz":0,"protector":0,"irrespetuoso":0,"insensible":0,"hostil":0,"cariñoso":0,"irresponsable":0,"curioso":1,"dramatico":0,"jactancioso":0,"callado":0,"generoso":0,"presumido":0,"espontáneo":0,"aburrido":0,"atento":1,"mezquino":0,"indiferente":0,"valiente":0,"charlatán":0,"erudito":0,"envidioso":0,"prepotente":0,"inseguro":0,"listo":0,"modesto":0,"sombrio":0,"amigable":1,"desconfiado":0,"reflexivo":0,"tímido":0,"egoísta":0,"temerario":0,"tonto":0,"mandón":0,"rencoroso":0,"ignorante":0,"simpático":0,"amable":0,"imprudente":0,"vulgar":0,"pesimista":0,"inquieto":1,"ingenuo":0,"terco":0,"irracional":0,"previsible":0,"extrovertido":0,"débil":0,"violento":0,"pasivo":0,"físgón":0,"tenso":0,"relajado":0,"sensible":0,"frío":0,"orgulloso":0,"tranquilo":0,"flexible":0,"maduro":0,"feliz":1,"distante":0},
    {"impaciente":0,"cobarde":0,"alegre":0,"enérgico":0,"caótico":0,"lógico":0,"inmaduro":0,"audaz":1,"protector":1,"irrespetuoso":0,"insensible":0,"hostil":0,"cariñoso":0,"irresponsable":0,"curioso":0,"dramatico":0,"jactancioso":0,"callado":0,"generoso":0,"presumido":0,"espontáneo":0,"aburrido":0,"atento":0,"mezquino":0,"indiferente":0,"valiente":0,"charlatán":0,"erudito":0,"envidioso":0,"prepotente":0,"inseguro":0,"listo":1,"modesto":0,"sombrio":0,"amigable":0,"desconfiado":0,"reflexivo":1,"tímido":0,"egoísta":0,"temerario":0,"tonto":0,"mandón":0,"rencoroso":0,"ignorante":0,"simpático":0,"amable":1,"imprudente":0,"vulgar":0,"pesimista":0,"inquieto":0,"ingenuo":0,"terco":0,"irracional":0,"previsible":0,"extrovertido":0,"débil":0,"violento":0,"pasivo":0,"físgón":0,"tenso":0,"relajado":0,"sensible":0,"frío":0,"orgulloso":0,"tranquilo":0,"flexible":0,"maduro":1,"feliz":0,"distante":0},
    {"impaciente":1,"cobarde":0,"alegre":0,"enérgico":0,"caótico":0,"lógico":0,"inmaduro":0,"audaz":0,"protector":0,"irrespetuoso":0,"insensible":0,"hostil":0,"cariñoso":0,"irresponsable":0,"curioso":0,"dramatico":1,"jactancioso":0,"callado":0,"generoso":0,"presumido":0,"espontáneo":0,"aburrido":0,"atento":0,"mezquino":0,"indiferente":0,"valiente":0,"charlatán":0,"erudito":0,"envidioso":0,"prepotente":0,"inseguro":0,"listo":1,"modesto":0,"sombrio":0,"amigable":0,"desconfiado":0,"reflexivo":0,"tímido":0,"egoísta":0,"temerario":0,"tonto":0,"mandón":0,"rencoroso":0,"ignorante":0,"simpático":0,"amable":0,"imprudente":0,"vulgar":0,"pesimista":0,"inquieto":0,"ingenuo":0,"terco":0,"irracional":0,"previsible":0,"extrovertido":0,"débil":0,"violento":0,"pasivo":1,"físgón":0,"tenso":0,"relajado":0,"sensible":0,"frío":0,"orgulloso":0,"tranquilo":1,"flexible":0,"maduro":0,"feliz":1,"distante":0},
    {"impaciente":0,"cobarde":0,"alegre":0,"enérgico":0,"caótico":0,"lógico":1,"inmaduro":0,"audaz":0,"protector":0,"irrespetuoso":0,"insensible":0,"hostil":0,"cariñoso":0,"irresponsable":0,"curioso":1,"dramatico":0,"jactancioso":0,"callado":0,"generoso":0,"presumido":0,"espontáneo":0,"aburrido":0,"atento":0,"mezquino":0,"indiferente":0,"valiente":0,"charlatán":0,"erudito":0,"envidioso":0,"prepotente":0,"inseguro":0,"listo":1,"modesto":0,"sombrio":0,"amigable":0,"desconfiado":0,"reflexivo":1,"tímido":0,"egoísta":0,"temerario":0,"tonto":0,"mandón":0,"rencoroso":0,"ignorante":0,"simpático":0,"amable":0,"imprudente":0,"vulgar":0,"pesimista":0,"inquieto":0,"ingenuo":0,"terco":0,"irracional":0,"previsible":0,"extrovertido":0,"débil":0,"violento":0,"pasivo":0,"físgón":0,"tenso":1,"relajado":1,"sensible":0,"frío":0,"orgulloso":0,"tranquilo":0,"flexible":0,"maduro":0,"feliz":0,"distante":0}]
  
  console.log( generarVentanaPersona(usuario,dataPrueba))
});

// ventanaJohari.definirColumnaEntorno('entorno');
// ventanaJohari.definirColumnaFecha('Marca temporal');
// ventanaJohari.definirColumnaEvaluado('evaluado');
// ventanaJohari.definirColumnaEvaluador('evaluador');
// ventanaJohari.definirColumnasCalificaciones(['impaciente',
//        'cobarde',	'alegre',	'enérgico',	'caótico',	'lógico',	'inmaduro',	
//        'audaz',	'protector',	'irrespetuoso',	'insensible',	'hostil',	
//        'cariñoso',	'irresponsable',	'curioso',	'dramatico',	'jactancioso',	
//        'callado',	'generoso',	'presumido',	'espontáneo',	'aburrido',	
//        'atento',	'mezquino',	'indiferente',	'valiente',	'charlatán',	
//        'erudito',	'envidioso',	'prepotente',	'inseguro',	'listo',	'modesto',	
//        'sombrio',	'amigable',	'desconfiado',	'reflexivo',	'tímido',	'egoísta',	
//        'temerario',	'tonto',	'mandón',	'rencoroso',	'ignorante',	'simpático',	
//        'amable',	'imprudente',	'vulgar',	'pesimista',	'inquieto',	'ingenuo',	'terco',	
//        'irracional',	'previsible',	'extrovertido',	'débil',	'violento',	'pasivo',	
//        'físgón',	'tenso',	'relajado',	'sensible',	'frío',	'orgulloso',	'tranquilo',	
//        'flexible',	'maduro',	'feliz',	'distante']);
// ventanaJohari.definirLugarGuardaResultado('data_base/ventanaDeHonary.json');
// ventanaJohari.crearJsonDeOpciones();
// ventanaJohari.ejecutarPrograma().then((jsonVentana => graficaJohariTablas.graficacionTablasDesdeDatos(jsonVentana)));
// /*
// Cuando se crea un objeto inmediatamente el objeto debe tener todos los datos para que este funcione correctamente
// procurar que no existan void que son funciones que no retornan nada que generan un cambio dentro del objeto
// */

