import fs from 'fs';



import  {bigfiveJohariPerson,
    bigfiveJohariEntorno
    ,DataJohariEntorno,
    FactorBigfive,
    Persona_entorno}  from './bigFiveJohari';
var datosVentanaDeHonary:string = fs.readFileSync('../data_base/ventanaDeHonary.json','utf-8');
var objectVentanaDeHonary:DataJohariEntorno[] = JSON.parse(datosVentanaDeHonary);
var factorBigfive1:FactorBigfive = {    'apertura':['físgón',	'curioso',	'valiente',	'audaz',	'temerario',	'inquieto',	'imprudente'],'noApertura':['tonto',	'ignorante'],'extroversion':['simpático',	'energico',	'extrovertido',	'amigable',	'charlatán',	'cariñoso',	'espontáneo'],'introversion':['callado',	'indiferente',	'distante',	'reflexivo',	'frío',],'obedienciaNormas':['atento',	'maduro',	'previsible',	'erudito'],'noObedienciaNormas':['flexible',	'irresponsable',	'irracional'],'neuroticismo':['caótico',	'tenso',	'pesimista',	'desconfiado',	'tímido',	'cobarde',	'violento',	'dramatico',	'inseguro',	'impaciente'],'noNeurotismo':['tranquilo',	'alegre',		'relajado',	'pasivo',	'feliz'],'noAmable':['irrespetuoso',	'mezquino',	'sombrio',	'hostil',	'egoísta',	'insensible',	'prepotente',	'vulgar',	'rencoroso'],'amable':['amable',	'protector',	'sensible',	'generoso',	'modesto',	'envidioso']};
let personaEntorno:Persona_entorno = objectVentanaDeHonary[0].personas_entorno[0]
let respuesta =  bigfiveJohariPerson(factorBigfive1,personaEntorno)

for(let zona in respuesta.ventanaDeJohariBigFive){
    console.log(zona,respuesta.ventanaDeJohariBigFive[zona])
}
let ventanaBigFiveJohari = bigfiveJohariEntorno(factorBigfive1,objectVentanaDeHonary[0])
fs.writeFileSync('../data_base/resultadoVentanaDeHonaryBigfive.json',JSON.stringify(ventanaBigFiveJohari))