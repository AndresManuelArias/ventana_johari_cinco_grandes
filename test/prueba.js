"use strict";
const csvdata = require('csvdata');
const bigFiveJohari_1 = require("../bigFiveJohari/bigFiveJohari");
const fs = require('fs');
var ventanaDeHonaryPrueba = JSON.parse( fs.readFileSync("data_base/ventanaDeHonaryPrueba.json","utf-8"))


test('probar sacar puntajes big five', async () => {
    expect.assertions(6);
    const data = await csvdata.load("data_base/clasificacion TCIR ventana de johari -  Análisis factorial de los adjetivos del AEP.csv", {
        delimiter: ',',
        encoding: 'utf8',
        log: true,
        objName: false,
        parse: true,
        stream: false
    });
    console.log('data', data);
    var datosUsuario = {
        "Impaciente": [0, 0, 0, 1, 0],
        "Alegre": [0, 1, 0, 0, 0],
        "Lógico": [0, 0, 0, 0, 1],
        "Audaz": [0, 0, 1, 0, 0],
        "Curioso": [0, 1, 0, 0, 1],
        "Dramatico": [0, 0, 0, 1, 0],
        "Atento": [0, 1, 0, 0, 0],
        "Valiente": [1, 0, 0, 0, 0],
        "Listo": [1, 0, 1, 1, 1],
        "Amigable": [0, 1, 0, 0, 0],
        "Reflexivo": [1, 0, 1, 0, 1],
        "Egoísta": [1, 0, 0, 0, 0],
        "Amable": [0, 0, 1, 0, 0],
        "Inquieto": [1, 1, 0, 0, 0],
        "Pasivo": [0, 0, 0, 1, 0],
        "Tenso": [0, 0, 0, 0, 1],
        "Relajado": [0, 0, 0, 0, 1],
        "Tranquilo": [0, 0, 0, 1, 0],
        "Maduro": [0, 0, 1, 0, 0],
        "Feliz": [0, 1, 0, 1, 0]
    };
    var datoUsuario1 = {"cobarde":[0,0,0,0,0,0],
    "enérgico":[0,0,0,0,0,0],
    "caótico":[0,0,0,0,0,0],
    "inmaduro":[0,0,0,0,0,0],
    "irrespetuoso":[0,0,0,0,0,0],
    "insensible":[0,0,0,0,0,0],
    "hostil":[0,0,0,0,0,0],
    "cariñoso":[0,0,0,0,0,0],
    "irresponsable":[0,0,0,0,0,0],
    "callado":[0,0,0,0,0,0],
    "generoso":[0,0,0,0,0,0],
    "presumido":[0,0,0,0,0,0],
    "espontáneo":[0,0,0,0,0,0],
    "aburrido":[0,0,0,0,0,0],
    "mezquino":[0,0,0,0,0,0],
    "indiferente":[0,0,0,0,0,0],
    "charlatán":[0,0,0,0,0,0],
    "erudito":[0,0,0,0,0,0],
    "envidioso":[0,0,0,0,0,0],
    "prepotente":[0,0,0,0,0,0],
    "inseguro":[0,0,0,0,0,0],
    "modesto":[0,0,0,0,0,0],
    "sombrio":[0,0,0,0,0,0],
    "desconfiado":[0,0,0,0,0,0],
    "tímido":[0,0,0,0,0,0],
    "temerario":[0,0,0,0,0,0],
    "tonto":[0,0,0,0,0,0],
    "mandón":[0,0,0,0,0,0],
    "rencoroso":[0,0,0,0,0,0],
    "ignorante":[0,0,0,0,0,0],
    "simpático":[0,0,0,0,0,0],
    "vulgar":[0,0,0,0,0,0],
    "ingenuo":[0,0,0,0,0,0],
    "irracional":[0,0,0,0,0,0],
    "previsible":[0,0,0,0,0,0],
    "extrovertido":[0,0,0,0,0,0],
    "débil":[0,0,0,0,0,0],
    "violento":[0,0,0,0,0,0],
    "físgón":[0,0,0,0,0,0],
    "sensible":[0,0,0,0,0,0],
    "frío":[0,0,0,0,0,0],
    "orgulloso":[0,0,0,0,0,0],
    "distante":[0,0,0,0,0,0]}
    // console.log('sacar puntaje',bigFiveJohari_1.convertirPuntajeBigFiveInJson(bigFiveJohari_1.sacarPuntajeBigFive(datoUsuario1, data, { max: 1, min: 0 })))
     //expect(bigFiveJohari_1.sacarPuntajeBigFive(datosUsuario, data, { max: 1, min: 0 }).get('apertura').length).toBe(6);
    // expect(datosUsuario["Feliz"]).toEqual([0, 1, 0, 1, 0]);
    // expect(bigFiveJohari_1.inversionPuntaje(0,-1,{min:1,max:5})).toEqual(0);
    // expect(bigFiveJohari_1.inversionPuntaje(2,1,{min:0,max:5})).toEqual(2);
    // expect(bigFiveJohari_1.inversionPuntaje(1,-1,{min:0,max:5})).toEqual(4);
    // expect(bigFiveJohari_1.inversionPuntaje(0,-1,{min:0,max:5})).toEqual(0);

    // var resultadoPruebaMap= ventanaDeHonaryPrueba[0]['personas_entorno'].map((personas)=> {
    //     personas["ventana de johari"] =  bigFiveJohari_1.generarBigFiveJohari(personas["ventana de johari"],data, { max: 1, min: 1 })
    //     //console.log('personas["ventana de johari"]',personas["ventana de johari"])

    //     return personas
    // })
    // fs.writeFileSync('data_base/ventanaDeHonaryBigFivePrueba1.json',JSON.stringify(resultadoPruebaMap));
    /*var resultadoPruebaMapSum= ventanaDeHonaryPrueba[0]['personas_entorno'].map((personas)=> {
        personas["ventana de johari"] =  bigFiveJohari_1.generarBigFiveJohariSum(personas["ventana de johari"],data, { max: 1, min: 1 })
        personas["opinion propia"] =bigFiveJohari_1.bifivePersonasSumaFactores(personas["opinion propia"] ,data,{ max: 1, min: 1 })
        personas["opinion otros"] =bigFiveJohari_1.generarBigFiveJohariSum(personas["opinion otros"] ,data,{ max: 1, min: 1 })
        //console.log('personas["ventana de johari"]',personas["ventana de johari"])
        expect(personas["ventana de johari"].zonaDesconocida).toEqual({"amabilidad":0,"neuroticismo":0,"extraversión":0,"responsabilidad":0,"apertura":0});
        
        return personas
    })*/
    var resultadoPruebaMapPromedioPonderado= ventanaDeHonaryPrueba[0]['personas_entorno'].map((personas)=> {
        personas["ventana de johari"] =  bigFiveJohari_1.bigFiveJohariVariasPersonasPorcentajeFactores(personas["ventana de johari"],data, { max: 1, min: 1 })
        personas["opinion propia"] =bigFiveJohari_1.bifiveUnaPersonaPorcentajeDeFactores(personas["opinion propia"] ,data,{ max: 1, min: 1 })
        personas["opinion otros"] =bigFiveJohari_1.bigFiveJohariVariasPersonasPorcentajeFactores(personas["opinion otros"] ,data,{ max: 1, min: 1 })
        //console.log('personas["ventana de johari"]',personas["ventana de johari"])
        expect(personas["ventana de johari"].zonaDesconocida).toEqual({"amabilidad":0,"neuroticismo":0,"extraversión":0,"responsabilidad":0,"apertura":0});
        
        return personas
    })
    fs.writeFileSync('data_base/ventanaDeHonaryBigFivePruebaPromedioPonderado.json',JSON.stringify(resultadoPruebaMapPromedioPonderado));
    /*fs.writeFileSync('data_base/ventanaDeHonaryBigFivePruebaSum.json',JSON.stringify(resultadoPruebaMapSum));*/
    fs.writeFileSync('data_base/calificacionAdjetivos.json',JSON.stringify(data))
});

test('probar inversion puntajes', async () => {

    expect(bigFiveJohari_1.inversionPuntaje(0,-1,{min:1,max:5})).toEqual(0);
    expect(bigFiveJohari_1.inversionPuntaje(1,-1,{min:1,max:5})).toEqual(4);
    expect(bigFiveJohari_1.inversionPuntaje(2,-1,{min:1,max:5})).toEqual(3);
    expect(bigFiveJohari_1.inversionPuntaje(3,-1,{min:1,max:5})).toEqual(2);
    expect(bigFiveJohari_1.inversionPuntaje(4,-1,{min:1,max:5})).toEqual(1);
    expect(bigFiveJohari_1.inversionPuntaje(5,-1,{min:1,max:5})).toEqual(0);
    expect(bigFiveJohari_1.inversionPuntaje(0,-1,{min:1,max:1})).toEqual(0);
    expect(bigFiveJohari_1.inversionPuntaje(1,-1,{min:1,max:1})).toEqual(0);
    expect(bigFiveJohari_1.inversionPuntaje(0,1,{min:1,max:1})).toEqual(0);
    expect(bigFiveJohari_1.inversionPuntaje(1,1,{min:1,max:1})).toEqual(1);
    expect(bigFiveJohari_1.inversionPuntaje(1,-0.29,{min:1,max:1})).toEqual(0.71);
    expect(bigFiveJohari_1.inversionPuntaje(1,-0.44,{min:1,max:1})).toEqual(0.56);// simulacion relajado
    expect(bigFiveJohari_1.inversionPuntaje(1,0.64,{min:1,max:1})).toEqual(0.64);// simulacion amable
    expect(bigFiveJohari_1.inversionPuntaje(5,-0.44,{min:1,max:5})).toEqual(2.8);// simulacion relajado
    expect(bigFiveJohari_1.inversionPuntaje(5,-0.9,{min:1,max:5})).toEqual(0.5);
     
    


});
test('probar inversion puntajes varios', async () => {
    let lista  ={"cobarde":[0,0,0,0,0,0],"enérgico":[0,0,0,0,0,0],"caótico":[0,0,0,0,0,0],"inmaduro":[0,0,0,0,0,0],"irrespetuoso":[0,0,0,0,0,0],"insensible":[0,0,0,0,0,0],"hostil":[0,0,0,0,0,0],"cariñoso":[0,0,0,0,0,0],"irresponsable":[0,0,0,0,0,0],"callado":[0,0,0,0,0,0],"generoso":[0,0,0,0,0,0],"presumido":[0,0,0,0,0,0],"espontáneo":[0,0,0,0,0,0],"aburrido":[0,0,0,0,0,0],"mezquino":[0,0,0,0,0,0],"indiferente":[0,0,0,0,0,0],"charlatán":[0,0,0,0,0,0],"erudito":[0,0,0,0,0,0],"envidioso":[0,0,0,0,0,0],"prepotente":[0,0,0,0,0,0],"inseguro":[0,0,0,0,0,0],"modesto":[0,0,0,0,0,0],"sombrio":[0,0,0,0,0,0],"desconfiado":[0,0,0,0,0,0],"tímido":[0,0,0,0,0,0],"temerario":[0,0,0,0,0,0],"tonto":[0,0,0,0,0,0],"mandón":[0,0,0,0,0,0],"rencoroso":[0,0,0,0,0,0],"ignorante":[0,0,0,0,0,0],"simpático":[0,0,0,0,0,0],"vulgar":[0,0,0,0,0,0],"ingenuo":[0,0,0,0,0,0],"irracional":[0,0,0,0,0,0],"previsible":[0,0,0,0,0,0],"extrovertido":[0,0,0,0,0,0],"débil":[0,0,0,0,0,0],"violento":[0,0,0,0,0,0],"físgón":[0,0,0,0,0,0],"sensible":[0,0,0,0,0,0],"frío":[0,0,0,0,0,0],"orgulloso":[0,0,0,0,0,0],"distante":[0,0,0,0,0,0]}
    let calificacionAdjetivos = [{"Adjetivo":"bondadoso","amabilidad":0.66,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"amable","amabilidad":0.64,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"cordial","amabilidad":0.59,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"generoso","amabilidad":0.58,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"cálido","amabilidad":0.53,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"considerado","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"solidario","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"comprensivo","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"conciliador","amabilidad":0.47,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"modesto","amabilidad":0.47,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"simpático","amabilidad":0.44,"neuroticismo":"","extraversión":0.43,"responsabilidad":"","apertura":""},{"Adjetivo":"pacífico","amabilidad":0.4,"neuroticismo":-0.33,"extraversión":-0.39,"responsabilidad":"","apertura":""},{"Adjetivo":"confiable","amabilidad":0.39,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"esperanzado","amabilidad":0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"sincero","amabilidad":0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"arrogante","amabilidad":-0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.3},{"Adjetivo":"egoísta","amabilidad":-0.35,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"nervioso","amabilidad":"","neuroticismo":0.65,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"ansioso","amabilidad":"","neuroticismo":0.65,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"quejoso","amabilidad":"","neuroticismo":0.53,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"tenso","amabilidad":"","neuroticismo":0.53,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"inseguro","amabilidad":"","neuroticismo":0.48,"extraversión":"","responsabilidad":-0.29,"apertura":""},{"Adjetivo":"melancólico","amabilidad":"","neuroticismo":0.48,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"depresivo","amabilidad":"","neuroticismo":0.46,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"triste","amabilidad":"","neuroticismo":0.45,"extraversión":-0.33,"responsabilidad":"","apertura":""},{"Adjetivo":"estable","amabilidad":"","neuroticismo":-0.44,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"relajado","amabilidad":"","neuroticismo":-0.44,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"impulsivo","amabilidad":"","neuroticismo":0.44,"extraversión":0.29,"responsabilidad":"","apertura":""},{"Adjetivo":"celoso","amabilidad":"","neuroticismo":0.4,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"desconfiado","amabilidad":"","neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"sensible","amabilidad":0.33,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"frágil","amabilidad":0.33,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"agresivo","amabilidad":-0.34,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"indeciso","amabilidad":"","neuroticismo":0.35,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"vulnerable","amabilidad":"","neuroticismo":0.35,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"callado","amabilidad":"","neuroticismo":"","extraversión":-0.68,"responsabilidad":"","apertura":""},{"Adjetivo":"tímido","amabilidad":"","neuroticismo":"","extraversión":-0.55,"responsabilidad":"","apertura":""},{"Adjetivo":"sociable","amabilidad":0.44,"neuroticismo":"","extraversión":0.52,"responsabilidad":"","apertura":""},{"Adjetivo":"retraído","amabilidad":"","neuroticismo":"","extraversión":-0.51,"responsabilidad":"","apertura":""},{"Adjetivo":"calmo","amabilidad":"","neuroticismo":-0.47,"extraversión":0.48,"responsabilidad":"","apertura":""},{"Adjetivo":"distante","amabilidad":"","neuroticismo":"","extraversión":-0.46,"responsabilidad":"","apertura":""},{"Adjetivo":"solitario","amabilidad":"","neuroticismo":"","extraversión":-0.45,"responsabilidad":"","apertura":""},{"Adjetivo":"conversador","amabilidad":"","neuroticismo":"","extraversión":-0.4,"responsabilidad":"","apertura":""},{"Adjetivo":"alegre","amabilidad":0.32,"neuroticismo":"","extraversión":0.34,"responsabilidad":"","apertura":""},{"Adjetivo":"controlado","amabilidad":"","neuroticismo":"","extraversión":-0.34,"responsabilidad":0.25,"apertura":""},{"Adjetivo":"espontáneo","amabilidad":"","neuroticismo":"","extraversión":0.27,"responsabilidad":"","apertura":0.27},{"Adjetivo":"organizado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.63,"apertura":""},{"Adjetivo":"responsable","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.58,"apertura":""},{"Adjetivo":"desordenado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.58,"apertura":""},{"Adjetivo":"haragán","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.53,"apertura":""},{"Adjetivo":"precavido","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.5,"apertura":""},{"Adjetivo":"descuidado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.47,"apertura":""},{"Adjetivo":"productivo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.47,"apertura":""},{"Adjetivo":"previsor","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.47,"apertura":""},{"Adjetivo":"desprolijo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.46,"apertura":""},{"Adjetivo":"perseverante","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.42,"apertura":""},{"Adjetivo":"activo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.42,"apertura":""},{"Adjetivo":"inconstante","amabilidad":"","neuroticismo":-0.32,"extraversión":"","responsabilidad":-0.4,"apertura":""},{"Adjetivo":"conservador","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.27,"apertura":""},{"Adjetivo":"creativo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.65},{"Adjetivo":"original","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.57},{"Adjetivo":"imaginativo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.55},{"Adjetivo":"aventurero","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.54},{"Adjetivo":"fantasioso","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.41},{"Adjetivo":"curioso","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.4},{"Adjetivo":"tradicional","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.3},{"Adjetivo":"convencional","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.28},{"Adjetivo":"rutinario","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.28}] 
    // {"amabilidad":[0,0,0,0,0,0,0,0,0,0],"neuroticismo":[0,0,0,0,0,0,0,0,0,0],"extraversión":[0,0,0,0,0,0,0.68,0.55,0.46,0],"responsabilidad":[0,0,0,0.29,0,0,0,0,0,0],"apertura":[0,0,0,0,0,0,0,0,0,0]}
    expect(bigFiveJohari_1.convertirPuntajeBigFiveInJson(bigFiveJohari_1.sacarPuntajeBigFive(lista,calificacionAdjetivos,{min:1,max:1}))).toEqual({"amabilidad":[0,0,0,0,0,0,0,0,0,0],"neuroticismo":[0,0,0,0,0,0,0,0,0,0],"extraversión":[0,0,0,0,0,0,0,0,0,0],"responsabilidad":[0,0,0,0,0,0,0,0,0,0],"apertura":[0,0,0,0,0,0,0,0,0,0]});

})
test('ver puntajes varios', async () => {
    let calificacionAdjetivos = [{"Adjetivo":"bondadoso","amabilidad":0.66,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"amable","amabilidad":0.64,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"cordial","amabilidad":0.59,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"generoso","amabilidad":0.58,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"cálido","amabilidad":0.53,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"considerado","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"solidario","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"comprensivo","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"conciliador","amabilidad":0.47,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"modesto","amabilidad":0.47,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"simpático","amabilidad":0.44,"neuroticismo":"","extraversión":0.43,"responsabilidad":"","apertura":""},{"Adjetivo":"pacífico","amabilidad":0.4,"neuroticismo":-0.33,"extraversión":-0.39,"responsabilidad":"","apertura":""},{"Adjetivo":"confiable","amabilidad":0.39,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"esperanzado","amabilidad":0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"sincero","amabilidad":0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"arrogante","amabilidad":-0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.3},{"Adjetivo":"egoísta","amabilidad":-0.35,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"nervioso","amabilidad":"","neuroticismo":0.65,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"ansioso","amabilidad":"","neuroticismo":0.65,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"quejoso","amabilidad":"","neuroticismo":0.53,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"tenso","amabilidad":"","neuroticismo":0.53,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"inseguro","amabilidad":"","neuroticismo":0.48,"extraversión":"","responsabilidad":-0.29,"apertura":""},{"Adjetivo":"melancólico","amabilidad":"","neuroticismo":0.48,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"depresivo","amabilidad":"","neuroticismo":0.46,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"triste","amabilidad":"","neuroticismo":0.45,"extraversión":-0.33,"responsabilidad":"","apertura":""},{"Adjetivo":"estable","amabilidad":"","neuroticismo":-0.44,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"relajado","amabilidad":"","neuroticismo":-0.44,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"impulsivo","amabilidad":"","neuroticismo":0.44,"extraversión":0.29,"responsabilidad":"","apertura":""},{"Adjetivo":"celoso","amabilidad":"","neuroticismo":0.4,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"desconfiado","amabilidad":"","neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"sensible","amabilidad":0.33,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"frágil","amabilidad":0.33,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"agresivo","amabilidad":-0.34,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"indeciso","amabilidad":"","neuroticismo":0.35,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"vulnerable","amabilidad":"","neuroticismo":0.35,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"callado","amabilidad":"","neuroticismo":"","extraversión":-0.68,"responsabilidad":"","apertura":""},{"Adjetivo":"tímido","amabilidad":"","neuroticismo":"","extraversión":-0.55,"responsabilidad":"","apertura":""},{"Adjetivo":"sociable","amabilidad":0.44,"neuroticismo":"","extraversión":0.52,"responsabilidad":"","apertura":""},{"Adjetivo":"retraído","amabilidad":"","neuroticismo":"","extraversión":-0.51,"responsabilidad":"","apertura":""},{"Adjetivo":"calmo","amabilidad":"","neuroticismo":-0.47,"extraversión":0.48,"responsabilidad":"","apertura":""},{"Adjetivo":"distante","amabilidad":"","neuroticismo":"","extraversión":-0.46,"responsabilidad":"","apertura":""},{"Adjetivo":"solitario","amabilidad":"","neuroticismo":"","extraversión":-0.45,"responsabilidad":"","apertura":""},{"Adjetivo":"conversador","amabilidad":"","neuroticismo":"","extraversión":-0.4,"responsabilidad":"","apertura":""},{"Adjetivo":"alegre","amabilidad":0.32,"neuroticismo":"","extraversión":0.34,"responsabilidad":"","apertura":""},{"Adjetivo":"controlado","amabilidad":"","neuroticismo":"","extraversión":-0.34,"responsabilidad":0.25,"apertura":""},{"Adjetivo":"espontáneo","amabilidad":"","neuroticismo":"","extraversión":0.27,"responsabilidad":"","apertura":0.27},{"Adjetivo":"organizado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.63,"apertura":""},{"Adjetivo":"responsable","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.58,"apertura":""},{"Adjetivo":"desordenado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.58,"apertura":""},{"Adjetivo":"haragán","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.53,"apertura":""},{"Adjetivo":"precavido","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.5,"apertura":""},{"Adjetivo":"descuidado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.47,"apertura":""},{"Adjetivo":"productivo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.47,"apertura":""},{"Adjetivo":"previsor","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.47,"apertura":""},{"Adjetivo":"desprolijo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.46,"apertura":""},{"Adjetivo":"perseverante","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.42,"apertura":""},{"Adjetivo":"activo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.42,"apertura":""},{"Adjetivo":"inconstante","amabilidad":"","neuroticismo":-0.32,"extraversión":"","responsabilidad":-0.4,"apertura":""},{"Adjetivo":"conservador","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.27,"apertura":""},{"Adjetivo":"creativo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.65},{"Adjetivo":"original","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.57},{"Adjetivo":"imaginativo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.55},{"Adjetivo":"aventurero","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.54},{"Adjetivo":"fantasioso","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.41},{"Adjetivo":"curioso","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.4},{"Adjetivo":"tradicional","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.3},{"Adjetivo":"convencional","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.28},{"Adjetivo":"rutinario","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.28}] 
    let opinionPropia = {"impaciente":0,"cobarde":0,"alegre":0,"enérgico":0,"caótico":0,"lógico":0,"inmaduro":0,"audaz":0,"protector":0,"irrespetuoso":0,"insensible":1,"hostil":0,"cariñoso":0,"irresponsable":0,"curioso":0,"dramatico":0,"jactancioso":0,"callado":0,"generoso":0,"presumido":0,"espontáneo":0,"aburrido":0,"atento":0,"mezquino":0,"indiferente":0,"valiente":0,"charlatán":0,"erudito":0,"envidioso":0,"prepotente":0,"inseguro":0,"listo":1,"modesto":0,"sombrio":0,"amigable":0,"desconfiado":0,"reflexivo":0,"tímido":0,"egoísta":0,"temerario":0,"tonto":0,"mandón":0,"rencoroso":0,"ignorante":0,"simpático":0,"amable":1,"imprudente":0,"vulgar":0,"pesimista":0,"inquieto":0,"ingenuo":0,"terco":0,"irracional":0,"previsible":0,"extrovertido":0,"débil":0,"violento":0,"pasivo":0,"físgón":0,"tenso":0,"relajado":1,"sensible":0,"frío":1,"orgulloso":0,"tranquilo":0,"flexible":0,"maduro":1,"feliz":0,"distante":0}
    let zonaAbierta = {"listo":[1,1,1,0,1,1],"relajado":[0,0,0,1,0,1],"frío":[1,0,0,0,0,1],"maduro":[0,0,0,1,0,1]}
    expect(bigFiveJohari_1.convertirPuntajeBigFiveInJson(bigFiveJohari_1.sacarPuntajeBigFive(opinionPropia,calificacionAdjetivos,{min:1,max:1}))).toEqual({"amabilidad":[0.64,0],"neuroticismo":[0,0.56],"extraversión":[0,0],"responsabilidad":[0,0],"apertura":[0,0]});
    let filtrados = calificacionAdjetivos.filter((fila)=> opinionPropia[fila["Adjetivo"]] )// esto es solo para saber que adjetivos se necuentran dentro de la calificacion que se realizo
})

test('ver puntajes porcentajes', async () => {
    let calificacionAdjetivos = [
        {"Adjetivo":"bondadoso","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"amable","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"cordial","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"generoso","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"cálido","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"considerado","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"solidario","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"comprensivo","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"conciliador","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"modesto","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"simpático","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"pacífico","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"confiable","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"esperanzado","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"sincero","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"arrogante","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"egoísta","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"nervioso","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"ansioso","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},
        {"Adjetivo":"quejoso","amabilidad":1,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""}
       ] 
    let opinionPropia = {"bondadoso":1,
        "amable":1,
        "cordial":1,
        "generoso":1,
        "cálido":1,
        "considerado":1,
        "solidario":1,
        "comprensivo":1,
        "conciliador":1,
        "modesto":1,
        "simpático":1,
        "pacífico":1,
        "confiable":1,
        "esperanzado":1,
        "sincero":1,
        "arrogante":1,
        "egoísta":1,
        "nervioso":1,
        "ansioso":1,
        "quejoso":1}
    let zonaAbierta = [{
    "bondadoso":1,
    "amable":1,
    "cordial":1,
    "generoso":1,
    "cálido":1,
    "considerado":1,
    "solidario":1,
    "comprensivo":1,
    "conciliador":1,
    "modesto":1,
    "simpático":1,
    "pacífico":1,
    "confiable":1,
    "esperanzado":1,
    "sincero":1,
    "arrogante":1,
    "egoísta":1,
    "nervioso":1,
    "ansioso":1,
    "quejoso":1},{
        "bondadoso":1,
        "amable":1,
        "cordial":1,
        "generoso":1,
        "cálido":1,
        "considerado":1,
        "solidario":1,
        "comprensivo":1,
        "conciliador":1,
        "modesto":1,
        "simpático":0,
        "pacífico":0,
        "confiable":0,
        "esperanzado":0,
        "sincero":0,
        "arrogante":0,
        "egoísta":0,
        "nervioso":0,
        "ansioso":0,
        "quejoso":0}];

    console.log("porcentaje prueba", bigFiveJohari_1.bigFiveJohariVariasPersonasPorcentajeFactores(zonaAbierta,calificacionAdjetivos, { max: 1, min: 1 }))

    expect(bigFiveJohari_1.bifiveUnaPersonaPorcentajeDeFactores(opinionPropia,calificacionAdjetivos, { max: 1, min: 1 })).toEqual({"amabilidad":100,"neuroticismo":0,"extraversión":0,"responsabilidad":0,"apertura":0});
    expect(bigFiveJohari_1.bigFiveJohariVariasPersonasPorcentajeFactores(zonaAbierta,calificacionAdjetivos, { max: 1, min: 1 })).toEqual([{"amabilidad":100,"neuroticismo":0,"extraversión":0,"responsabilidad":0,"apertura":0},{"amabilidad":50,"neuroticismo":0,"extraversión":0,"responsabilidad":0,"apertura":0}]);
    expect(bigFiveJohari_1.bigFiveJohariVariasPersonasPorcentajeFactores([opinionPropia],calificacionAdjetivos, { max: 1, min: 1 })).toEqual([{"amabilidad":100,"neuroticismo":0,"extraversión":0,"responsabilidad":0,"apertura":0}]);
   })
/*
test('probar si todos los puntajes estan completos', async () => {
    let calificacionAdjetivos = [{"Adjetivo":"bondadoso","amabilidad":0.66,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"amable","amabilidad":0.64,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"cordial","amabilidad":0.59,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"generoso","amabilidad":0.58,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"cálido","amabilidad":0.53,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"considerado","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"solidario","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"comprensivo","amabilidad":0.52,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"conciliador","amabilidad":0.47,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"modesto","amabilidad":0.47,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"simpático","amabilidad":0.44,"neuroticismo":"","extraversión":0.43,"responsabilidad":"","apertura":""},{"Adjetivo":"pacífico","amabilidad":0.4,"neuroticismo":-0.33,"extraversión":-0.39,"responsabilidad":"","apertura":""},{"Adjetivo":"confiable","amabilidad":0.39,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"esperanzado","amabilidad":0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"sincero","amabilidad":0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"arrogante","amabilidad":-0.37,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.3},{"Adjetivo":"egoísta","amabilidad":-0.35,"neuroticismo":"","extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"nervioso","amabilidad":"","neuroticismo":0.65,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"ansioso","amabilidad":"","neuroticismo":0.65,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"quejoso","amabilidad":"","neuroticismo":0.53,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"tenso","amabilidad":"","neuroticismo":0.53,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"inseguro","amabilidad":"","neuroticismo":0.48,"extraversión":"","responsabilidad":-0.29,"apertura":""},{"Adjetivo":"melancólico","amabilidad":"","neuroticismo":0.48,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"depresivo","amabilidad":"","neuroticismo":0.46,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"triste","amabilidad":"","neuroticismo":0.45,"extraversión":-0.33,"responsabilidad":"","apertura":""},{"Adjetivo":"estable","amabilidad":"","neuroticismo":-0.44,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"relajado","amabilidad":"","neuroticismo":-0.44,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"impulsivo","amabilidad":"","neuroticismo":0.44,"extraversión":0.29,"responsabilidad":"","apertura":""},{"Adjetivo":"celoso","amabilidad":"","neuroticismo":0.4,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"desconfiado","amabilidad":"","neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"sensible","amabilidad":0.33,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"frágil","amabilidad":0.33,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"agresivo","amabilidad":-0.34,"neuroticismo":0.38,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"indeciso","amabilidad":"","neuroticismo":0.35,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"vulnerable","amabilidad":"","neuroticismo":0.35,"extraversión":"","responsabilidad":"","apertura":""},{"Adjetivo":"callado","amabilidad":"","neuroticismo":"","extraversión":-0.68,"responsabilidad":"","apertura":""},{"Adjetivo":"tímido","amabilidad":"","neuroticismo":"","extraversión":-0.55,"responsabilidad":"","apertura":""},{"Adjetivo":"sociable","amabilidad":0.44,"neuroticismo":"","extraversión":0.52,"responsabilidad":"","apertura":""},{"Adjetivo":"retraído","amabilidad":"","neuroticismo":"","extraversión":-0.51,"responsabilidad":"","apertura":""},{"Adjetivo":"calmo","amabilidad":"","neuroticismo":-0.47,"extraversión":0.48,"responsabilidad":"","apertura":""},{"Adjetivo":"distante","amabilidad":"","neuroticismo":"","extraversión":-0.46,"responsabilidad":"","apertura":""},{"Adjetivo":"solitario","amabilidad":"","neuroticismo":"","extraversión":-0.45,"responsabilidad":"","apertura":""},{"Adjetivo":"conversador","amabilidad":"","neuroticismo":"","extraversión":-0.4,"responsabilidad":"","apertura":""},{"Adjetivo":"alegre","amabilidad":0.32,"neuroticismo":"","extraversión":0.34,"responsabilidad":"","apertura":""},{"Adjetivo":"controlado","amabilidad":"","neuroticismo":"","extraversión":-0.34,"responsabilidad":0.25,"apertura":""},{"Adjetivo":"espontáneo","amabilidad":"","neuroticismo":"","extraversión":0.27,"responsabilidad":"","apertura":0.27},{"Adjetivo":"organizado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.63,"apertura":""},{"Adjetivo":"responsable","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.58,"apertura":""},{"Adjetivo":"desordenado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.58,"apertura":""},{"Adjetivo":"haragán","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.53,"apertura":""},{"Adjetivo":"precavido","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.5,"apertura":""},{"Adjetivo":"descuidado","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.47,"apertura":""},{"Adjetivo":"productivo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.47,"apertura":""},{"Adjetivo":"previsor","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.47,"apertura":""},{"Adjetivo":"desprolijo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.46,"apertura":""},{"Adjetivo":"perseverante","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.42,"apertura":""},{"Adjetivo":"activo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":0.42,"apertura":""},{"Adjetivo":"inconstante","amabilidad":"","neuroticismo":-0.32,"extraversión":"","responsabilidad":-0.4,"apertura":""},{"Adjetivo":"conservador","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":-0.27,"apertura":""},{"Adjetivo":"creativo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.65},{"Adjetivo":"original","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.57},{"Adjetivo":"imaginativo","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.55},{"Adjetivo":"aventurero","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.54},{"Adjetivo":"fantasioso","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.41},{"Adjetivo":"curioso","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.4},{"Adjetivo":"tradicional","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":0.3},{"Adjetivo":"convencional","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.28},{"Adjetivo":"rutinario","amabilidad":"","neuroticismo":"","extraversión":"","responsabilidad":"","apertura":-0.28}] 
    let opinionPropia = {"impaciente":1,"cobarde":1,"alegre":1,"enérgico":1,"caótico":1,"lógico":1,"inmaduro":1,"audaz":0,"protector":1,"irrespetuoso":1,"insensible":1,"hostil":1,"cariñoso":1,"irresponsable":1,"curioso":1,"dramatico":1,"jactancioso":1,"callado":1,"generoso":1,"presumido":1,"espontáneo":1,"aburrido":1,"atento":1,"mezquino":1,"indiferente":1,"valiente":1,"charlatán":1,"erudito":1,"envidioso":1,"prepotente":1,"inseguro":1,"listo":1,"modesto":1,"sombrio":1,"amigable":1,"desconfiado":1,"reflexivo":1,"tímido":1,"egoísta":1,"temerario":1,"tonto":1,"mandón":1,"rencoroso":1,"ignorante":1,"simpático":1,"amable":1,"imprudente":1,"vulgar":1,"pesimista":1,"inquieto":1,"ingenuo":1,"terco":1,"irracional":1,"previsible":1,"extrovertido":1,"débil":1,"violento":1,"pasivo":1,"físgón":1,"tenso":1,"relajado":1,"sensible":1,"frío":1,"orgulloso":0,"tranquilo":0,"flexible":1,"maduro":1,"feliz":1,"distante":1}
    let zonaAbierta = {"listo":[1,1,1,0,1,1],"relajado":[0,0,0,1,0,1],"frío":[1,0,0,0,0,1],"maduro":[0,0,0,1,0,1]}
    expect(bigFiveJohari_1.convertirPuntajeBigFiveInJson(bigFiveJohari_1.sacarPuntajeBigFive(opinionPropia,calificacionAdjetivos,{min:1,max:1}))).toEqual({"amabilidad":[0.64,0],"neuroticismo":[0,0.56],"extraversión":[0,0],"responsabilidad":[0,0],"apertura":[0,0]});
    let filtrados = calificacionAdjetivos.filter((fila)=> opinionPropia[fila["Adjetivo"]] )// esto es solo para saber que adjetivos se necuentran dentro de la calificacion que se realizo
})*/
// test('convertir json array ventana', async () => {
//     expect(bigFiveJohari_1.sacarPuntajeBigFive(datosUsuario, data, { max: 1, min: 0 }).get('apertura').length).toBe(6);

// })

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
