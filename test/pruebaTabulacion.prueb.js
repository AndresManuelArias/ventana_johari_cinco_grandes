"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvdata = require('csvdata');
const fs = require('fs');
const johariBigfive_1 = require("../bigFiveJohari/johariBigfive");
test('probar sacar puntajes big five', async () => {
    // expect.assertions(6);
    var adjetivos;
  csvdata.load("../data_base/clasificacion TCIR ventana de johari -  Análisis factorial de los adjetivos del AEP.csv", {
        delimiter: ',',
        encoding: 'utf8',
        log: true,
        objName: false,
        parse: true,
        stream: false
    }).then(data =>{console.log(data)
         adjetivos = data});
    // console.log('adjetivos', adjetivos);
    var johariBigfive = new johariBigfive_1.JohariBigfive({
        definirColumnaEntorno: 'entorno',
        definirColumnaFecha: 'fecha',
        definirColumnaEvaluado: 'evaluado',
        definirColumnaEvaluador: 'evaluador',
        definirColumnasCalificaciones: [
            'impaciente', 'cobarde', 'alegre', 'enérgico', 'caótico', 'lógico', 'inmaduro', 'audaz', 'protector', 'irrespetuoso', 'insensible', 'hostil',
            'cariñoso', 'irresponsable', 'curioso', 'dramatico', 'jactancioso', 'callado', 'generoso', 'presumido', 'espontáneo', 'aburrido', 'atento', 'mezquino',
            'indiferente', 'valiente', 'charlatán', 'erudito', 'envidioso', 'prepotente', 'inseguro', 'listo', 'modesto', 'sombrio', 'amigable', 'desconfiado', 'reflexivo',
            'tímido', 'egoísta', 'temerario', 'tonto', 'mandón', 'rencoroso', 'ignorante', 'simpático', 'amable', 'imprudente', 'vulgar', 'pesimista', 'inquieto', 'ingenuo',
            'terco', 'irracional', 'previsible', 'extrovertido', 'débil', 'violento', 'pasivo', 'físgón', 'tenso', 'relajado', 'sensible', 'frío', 'orgulloso', 'tranquilo', 'flexible', 'maduro', 'feliz', 'distante'
        ],
    }, adjetivos, { max: 1, min: 0 } );
    let johariRespuestas =  csvdata.load("../data_base/ventana de johari (respuestas) ADSI - tabulacion comportamientos.csv", {
        delimiter: ',',
        encoding: 'utf8',
        log: true,
        objName: false,
        parse: true,
        stream: false
    }).then(datos=>{console.log(datos);johariRespuestas = datos});
    //  let analisis = johariBigfive.analizar(johariRespuestas);
    //  console.log('analisis',analisis)
    //  fs.writeFile('data_base/ventanaDeHonaryBigFiveRespuesta.json', JSON.stringify(analisis), function(err:any) {
    //     if(err) return console.error(err);
    //   });
    let analisisCsv = johariBigfive.csvAnalizar(johariRespuestas);
    console.log('analisisCsv', analisisCsv);
    fs.writeFile('data_base/ventanaDeHonaryBigFiveRespuestaFilas.json', JSON.stringify(analisisCsv), function (err) {
        if (err)
            return console.error(err);
    });
    csvdata.write('./data_base/ventanaDeHonaryBigFiveRespuesta.csv', analisisCsv, { header: 'entorno,fecha,evaluado,evaluador,amabilidad,neuroticismo,extraversión,responsabilidad,apertura' });
    /**
     * JSON.stringify(datos[0]['personas_entorno'][0]['ventana de johari']['zonaOculta'] )
     *  JSON.stringify(datos[0]['personas_entorno'][0]['opinion propia'] )
     */
});
