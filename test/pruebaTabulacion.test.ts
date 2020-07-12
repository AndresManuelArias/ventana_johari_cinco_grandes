

"use strict";
const csvdata = require('csvdata');
const fs:any = require('fs');
import {JohariBigfive}  from "../bigFiveJohari/johariBigfive";





test('probar sacar puntajes big five', async () => {
    // expect.assertions(6);
    const adjetivos = await csvdata.load("data_base/clasificacion TCIR ventana de johari - analisis factorial 2.csv", {
        delimiter: ',',
        encoding: 'utf8',
        log: true,
        objName: false,
        parse: true,
        stream: false
    });
    // console.log('adjetivos', adjetivos);
    const johariBigfiveOperacion = new JohariBigfive(    {
        definirColumnaEntorno:'entorno',
        definirColumnaFecha:'fecha',
        definirColumnaEvaluado:'evaluado',
        definirColumnaEvaluador:'evaluador',
        definirColumnasCalificaciones:[
            'impaciente','cobarde','alegre','enérgico','caótico','lógico','inmaduro','audaz','protector','irrespetuoso','insensible','hostil',
            'cariñoso','irresponsable','curioso','dramatico','jactancioso','callado','generoso','presumido','espontáneo','aburrido','atento','mezquino',
            'indiferente','valiente','charlatán','erudito','envidioso','prepotente','inseguro','listo','modesto','sombrio','amigable','desconfiado','reflexivo',
            'tímido','egoísta','temerario','tonto','mandón','rencoroso','ignorante','simpático','amable','imprudente','vulgar','pesimista','inquieto','ingenuo',
            'terco','irracional','previsible','extrovertido','débil','violento','pasivo','físgón','tenso','relajado','sensible','frío','orgulloso','tranquilo','flexible','maduro','feliz','distante'
        ],
    },adjetivos, { max:1,min:0},'sum')
    const johariBigfive = new JohariBigfive(    {
        definirColumnaEntorno:'entorno',
        definirColumnaFecha:'fecha',
        definirColumnaEvaluado:'evaluado',
        definirColumnaEvaluador:'evaluador',
        definirColumnasCalificaciones:[
            'impaciente','cobarde','alegre','enérgico','caótico','lógico','inmaduro','audaz','protector','irrespetuoso','insensible','hostil',
            'cariñoso','irresponsable','curioso','dramatico','jactancioso','callado','generoso','presumido','espontáneo','aburrido','atento','mezquino',
            'indiferente','valiente','charlatán','erudito','envidioso','prepotente','inseguro','listo','modesto','sombrio','amigable','desconfiado','reflexivo',
            'tímido','egoísta','temerario','tonto','mandón','rencoroso','ignorante','simpático','amable','imprudente','vulgar','pesimista','inquieto','ingenuo',
            'terco','irracional','previsible','extrovertido','débil','violento','pasivo','físgón','tenso','relajado','sensible','frío','orgulloso','tranquilo','flexible','maduro','feliz','distante'
        ],
    },adjetivos, { max:1,min:0})
    const johariRespuestas = await csvdata.load("data_base/ventana de johari (respuestas)  - tabulacion comportamientos.csv", {
        delimiter: ',',
        encoding: 'utf8',
        log: true,
        objName: false,
        parse: true,
        stream: false
    });
     let analisis = johariBigfiveOperacion.analizar(johariRespuestas);
     console.log('analisis',analisis)
     fs.writeFile('data_base/ventanaDeHonaryBigFiveRespuestaSum.json', JSON.stringify(analisis), function(err:any) {
        if(err) return console.error(err);
      });
      let analisisCsv = johariBigfive.csvAnalizar(johariRespuestas)
      .filter(fila =>   {
          console.log( fila.amabilidad != 0 ||   fila.neuroticismo != 0 ||  fila.extraversión != 0 || fila.responsabilidad != 0 ||  fila.apertura != 0 )
          return fila.amabilidad != 0 ||   fila.neuroticismo != 0 ||  fila.extraversión != 0 || fila.responsabilidad != 0 ||  fila.apertura != 0 })
      console.log('analisisCsv',analisisCsv)
        fs.writeFile('data_base/ventanaDeHonaryBigFiveRespuestaFilas.json', JSON.stringify(analisisCsv), function(err:any) {
            if(err) return console.error(err);
        });
      csvdata.write('./data_base/ventanaDeHonaryBigFiveRespuesta.csv', analisisCsv, {header: 'entorno,fecha,evaluado,evaluador,amabilidad,neuroticismo,extraversión,responsabilidad,apertura'})
      /**
       * JSON.stringify(datos[0]['personas_entorno'][0]['ventana de johari']['zonaOculta'] )
       *  JSON.stringify(datos[0]['personas_entorno'][0]['opinion propia'] )
       */
});