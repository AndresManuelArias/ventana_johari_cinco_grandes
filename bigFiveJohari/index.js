// import fs from 'fs';
// const csvdata = require('csvdata')
// fs.readFileSync('')
// import  {bigfiveJohariPerson,
//     bigfiveJohariEntorno
//     ,DataJohariEntorno,
//     FactorBigfive,
//     Persona_entorno,sacarPuntajeBigFive}  from './bigFiveJohari';
//     csvdata.load("../data_base/clasificacion TCIR ventana de johari -  Análisis factorial de los adjetivos del AEP.csv", {
//         delimiter: ',',
//         encoding: 'utf8',
//         log: true,
//         objName: false,
//         parse: true,
//         stream: false
//       }).then((data:any[])=>{
//           console.log('data',data)
//         var datosUsuario = {
//             "Impaciente":[0,0,0,1,0],
//             "Alegre":[0,1,0,0,0],/**1 */
//             "Lógico":[0,0,0,0,1],
//             "Audaz":[0,0,1,0,0],
//             "Curioso":[0,1,0,0,1],/**2 */
//             "Dramatico":[0,0,0,1,0],
//             "Atento":[0,1,0,0,0],
//             "Valiente":[1,0,0,0,0],
//             "Listo":[1,0,1,1,1],
//             "Amigable":[0,1,0,0,0],
//             "Reflexivo":[1,0,1,0,1],
//             "Egoísta":[1,0,0,0,0],/**3 */
//             "Amable":[0,0,1,0,0],/**4 */
//             "Inquieto":[1,1,0,0,0],
//             "Pasivo":[0,0,0,1,0],
//             "Tenso":[0,0,0,0,1],/**5 */
//             "Relajado":[0,0,0,0,1],/**6 */
//             "Tranquilo":[0,0,0,1,0],
//             "Maduro":[0,0,1,0,0],
//             "Feliz":[0,1,0,1,0]
//         }
//         console.log(sacarPuntajeBigFive(datosUsuario,data,{max:1,min:0}))
//       })
// var datosVentanaDeHonary:string = fs.readFileSync('../data_base/ventanaDeHonary.json','utf-8');
// var objectVentanaDeHonary:DataJohariEntorno[] = JSON.parse(datosVentanaDeHonary);
// var factorBigfive1:FactorBigfive = {    'apertura':['flexible',	'curioso',	'valiente',	'audaz',	'temerario',	'erudito'],'noApertura':['tonto',	'ignorante'],'extroversion':['alegre','simpático',	'energico',	'extrovertido',	'amigable',	'charlatán',		'espontáneo'],'introversion':['sombrio','tímido','callado',		'distante',	'reflexivo',	],'obedienciaNormas':[	'maduro',	'previsible'],'noObedienciaNormas':[	'irresponsable'],'neuroticismo':['sensible',	'irracional','inquieto','caótico',	'tenso',	'pesimista',	'desconfiado',		'cobarde',	'violento',	'dramatico',	'inseguro',	'impaciente'],'noNeurotismo':['tranquilo',			'relajado',	'pasivo',	'feliz'],'noAmable':['frío','indiferente','envidioso','imprudente','físgón','irrespetuoso',	'mezquino',		'hostil',	'egoísta',	'insensible',	'prepotente',	'vulgar',	'rencoroso'],'amable':['atento','amable','cariñoso',	'protector',		'generoso',	'modesto']};
// let personaEntorno:Persona_entorno = objectVentanaDeHonary[0].personas_entorno[0]
// let respuesta =  bigfiveJohariPerson(factorBigfive1,personaEntorno)
// for(let zona in respuesta.ventanaDeJohariBigFive){
//     console.log(zona,respuesta.ventanaDeJohariBigFive[zona])
// }
// let ventanaBigFiveJohari = bigfiveJohariEntorno(factorBigfive1,objectVentanaDeHonary[0])
// fs.writeFileSync('../data_base/resultadoVentanaDeHonaryBigfive.json',JSON.stringify(ventanaBigFiveJohari))
