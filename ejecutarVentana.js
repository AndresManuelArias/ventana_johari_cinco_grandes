//ejecutar ventana

const ventanaJohari = require('./logicaJohari/ventanaJohari');

const graficaJohariTablas = require('./view/graficaJohariTablas');

// @ts-check 

console.log(ventanaJohari);

ventanaJohari.load('base_datos/ventana de johari (respuestas)  - tabulacion comportamientos.csv',
{
   delimiter: ',',
   log: true,
   objName: false,
   stream: false
 });
ventanaJohari.definirColumnaEntorno('entorno');
ventanaJohari.definirColumnaFecha('Marca temporal');
ventanaJohari.definirColumnaEvaluado('evaluado');
ventanaJohari.definirColumnaEvaluador('evaluador');
ventanaJohari.definirColumnasCalificaciones(['impaciente',
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
       'flexible',	'maduro',	'feliz',	'distante']);
ventanaJohari.definirLugarGuardaResultado('data_base/ventanaDeHonary.json');
ventanaJohari.crearJsonDeOpciones();
ventanaJohari.ejecutarPrograma().then((jsonVentana => graficaJohariTablas.graficacionTablasDesdeDatos(jsonVentana)));
/*
Cuando se crea un objeto inmediatamente el objeto debe tener todos los datos para que este funcione correctamente
procurar que no existan void que son funciones que no retornan nada que generan un cambio dentro del objeto
*/

