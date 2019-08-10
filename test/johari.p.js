const VentanaJohariRanda = require("../logicaJohari/ventanaJohariRanda");
const { BigFive } = require("../bigFive/bigFive");
const { JohariBigfive } = require("../bigFiveJohari/johariBigfive");
// console.log(VentanaJohariRanda)
let ventanaJohariRanda = new VentanaJohariRanda.VentanaJohariRanda({
    definirColumnaEntorno: 'entorno',
    definirColumnaFecha: 'fecha',
    definirColumnaEvaluado: 'evaluado',
    definirColumnaEvaluador: 'evaluador',
    definirColumnasCalificaciones: ['actitud', 'felicidad', 'tristeza', 'lealtad'],
});
function mostrarllaves(table, columna) {
    let array = [];
    VentanaJohariRanda.seleccionarEntornos(table, columna).forEach((element, keys) => { array.push(keys); });
    return array;
}
test('probando sin evaluado', () => {
    let table = [
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 1,
            felicidad: 0,
            tristeza: 2,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 2,
            felicidad: 3,
            tristeza: 0,
            lealtad: 0
        }
    ];
    let resultado = ventanaJohariRanda.analizar(table);
    console.log(resultado);
    console.log("resultado[0]['personas_entorno']", resultado[0]['personas_entorno']);
    expect(resultado[0]['personas_entorno'][0]['nombre usuario']).toEqual("miguel");
    console.log(resultado[0]['personas_entorno'][0]['ventana de johari']['zonaCiega']);
    expect(resultado[0]['personas_entorno'][0]['ventana de johari']['zonaCiega']).toEqual({ actitud: [1, 2],
        felicidad: [0, 3],
        tristeza: [2, 0] });
    console.log(resultado[0]['personas_entorno'][0]['ventana de johari']['zonaDesconocida']);
    expect(resultado[0]['personas_entorno'][0]['ventana de johari']['zonaDesconocida']).toEqual({ lealtad: [0, 0] });
    let keysEvaluador = mostrarllaves(table, 'evaluador');
    expect(keysEvaluador).toEqual(['carlos', 'sebastian']);
    let keysEvaluado1 = mostrarllaves(table, 'evaluado');
    expect(keysEvaluado1).toEqual(['miguel']);
});
test('probando solo evaluado ', () => {
    let table = [];
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'arturo',
        evaluador: 'arturo',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('3', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari']);
    expect(resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaOculta']).toEqual({ actitud: [2],
        felicidad: [3],
        tristeza: [2] });
    expect(resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaDesconocida']).toEqual({ lealtad: [0] });
    expect(resultado1[0]['personas_entorno'][0]["opinion propia"]).toEqual({ actitud: [2],
        felicidad: [3],
        tristeza: [2],
        "lealtad": [0] });
    let keys = mostrarllaves(table, 'evaluador');
    expect(keys).toEqual(['arturo']);
    let keysEvaluado = mostrarllaves(table, 'evaluado');
    expect(keysEvaluado).toEqual(['arturo']);
});
test('probando con autoevaluado y evaluadores', () => {
    let table = [
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 1,
            felicidad: 0,
            tristeza: 2,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 2,
            felicidad: 3,
            tristeza: 0,
            lealtad: 0
        }
    ];
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'miguel',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('2', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari']);
    expect(resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaAbierta']).toEqual({ actitud: [1, 2, 2],
        felicidad: [0, 3, 3],
        tristeza: [2, 0, 2] });
    let keys = mostrarllaves(table, 'evaluador');
    expect(keys).toEqual(['carlos', 'sebastian', 'miguel']);
    let keysEvaluado = mostrarllaves(table, 'evaluado');
    expect(keysEvaluado).toEqual(['miguel']);
});
test('probando con autoevaluado y  evaluadores que no lo calificaron', () => {
    let table = [
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 1,
            felicidad: 0,
            tristeza: 2,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 2,
            felicidad: 3,
            tristeza: 0,
            lealtad: 0
        }
    ];
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'arturo',
        evaluador: 'arturo',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('3', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][1]['ventana de johari']);
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaOculta']).toEqual({ actitud: [2],
        felicidad: [3],
        tristeza: [2] });
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaDesconocida']).toEqual({ lealtad: [0] });
    let keys = mostrarllaves(table, 'evaluador');
    expect(keys).toEqual(['carlos', 'sebastian', 'arturo']);
    let keysEvaluado = mostrarllaves(table, 'evaluado');
    expect(keysEvaluado).toEqual(['miguel', 'arturo']);
});
test('probando con autoevaluado sin calificar y  evaluadores que califican a otros', () => {
    let table = [
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 1,
            felicidad: 0,
            tristeza: 2,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 2,
            felicidad: 3,
            tristeza: 0,
            lealtad: 0
        }
    ];
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'arturo',
        evaluador: 'arturo',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'miguel',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('personas_entorno', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari']);
    expect(resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaAbierta']).toEqual({ actitud: [1, 2, 2],
        felicidad: [0, 3, 3],
        tristeza: [2, 0, 2] });
    console.log(resultado1[0]['personas_entorno'][1]['ventana de johari']);
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaOculta']).toEqual({ actitud: [2],
        felicidad: [3],
        tristeza: [2] });
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaDesconocida']).toEqual({ lealtad: [0] });
    let keys = mostrarllaves(table, 'evaluador');
    expect(keys).toEqual(['carlos', 'sebastian', 'arturo', "miguel"]);
    let keysEvaluado = mostrarllaves(table, 'evaluado');
    expect(keysEvaluado).toEqual(['miguel', 'arturo']);
});
test('probando con autoevaluado sin calificar y  nuevos evaluadores que califican', () => {
    let table = [
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 1,
            felicidad: 0,
            tristeza: 2,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 2,
            felicidad: 3,
            tristeza: 0,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'tatiana',
            felicidad: 0
        }
    ];
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'arturo',
        evaluador: 'arturo',
        actitud: 0,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'miguel',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'arturo',
        evaluador: 'santiago',
        actitud: 1,
        felicidad: 0,
        tristeza: 0,
        lealtad: 0
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'arturo',
        evaluador: 'miguel',
        felicidad: 1
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'tatiana',
        felicidad: 0
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'tatiana',
        felicidad: 5
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'tatiana',
        felicidad: 4
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'hernesto',
        felicidad: 6
    });
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('personas_entorno', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari']);
    expect(resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaAbierta']).toEqual({ actitud: [1, 2, 2],
        felicidad: [0, 3, 0, 0, 5, 4, 6, 3],
        tristeza: [2, 0, 2] });
    console.log("['personas_entorno'][1]['ventana de johari']", resultado1[0]['personas_entorno'][1]['ventana de johari']);
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaOculta']).toEqual({ tristeza: [2] });
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaAbierta']).toEqual({ felicidad: [0, 1, 3] });
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaDesconocida']).toEqual({ lealtad: [0] });
    expect(resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaCiega']).toEqual({ actitud: [1] });
    let evaluadorArray = [];
    VentanaJohariRanda.seleccionarEntornos(table, 'evaluador').forEach((element, keys) => { evaluadorArray.push(keys); });
    expect(evaluadorArray).toEqual(['carlos', 'sebastian', 'tatiana', 'arturo', 'miguel', "santiago", 'hernesto']);
    let keysEvaluado = mostrarllaves(table, 'evaluado');
    expect(keysEvaluado).toEqual(['miguel', 'arturo']);
});
let adjetivos = [
    {
        "Adjetivo": 'actitud',
        "amabilidad": 1,
        "neuroticismo": 0,
        "extraversión": 0.9,
        "responsabilidad": 0.9,
        "apertura": 0.9
    },
    {
        "Adjetivo": 'felicidad',
        "amabilidad": 1,
        "neuroticismo": 0,
        "extraversión": 0.5,
        "responsabilidad": 0.25,
        "apertura": 0.75
    },
    {
        "Adjetivo": 'tristeza',
        "amabilidad": 0.25,
        "neuroticismo": 1,
        "extraversión": 0,
        "responsabilidad": 0,
        "apertura": 0
    },
    {
        "Adjetivo": 'lealtad',
        "amabilidad": 1,
        "neuroticismo": 0,
        "extraversión": 1,
        "responsabilidad": 0.5,
        "apertura": 0.25
    }
];
const bigFive = new BigFive(adjetivos, { max: 5, min: 0 }, 'mean');
test('probando sin evaluado big five', () => {
    let table = [
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 5,
            felicidad: 5,
            tristeza: 5,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 5,
            felicidad: 5,
            tristeza: 0,
            lealtad: 0
        }
    ];
    let resultado = ventanaJohariRanda.analizar(table);
    console.log(resultado);
    console.log("resultado[0]['personas_entorno']", resultado[0]['personas_entorno']);
    console.log("resultado[0]['personas_entorno'][0]['ventana de johari'].zonaCiega", resultado[0]['personas_entorno'][0]['ventana de johari'].zonaCiega);
    let resultadoBigFive = bigFive.sacarPuntajeBigFive(resultado[0]['personas_entorno'][0]['ventana de johari'].zonaCiega);
    console.log('big five sin datos', bigFive.sacarPuntajeBigFive(resultado[0]['personas_entorno'][0]['ventana de johari'].zonaAbierta));
    console.log('big five', resultadoBigFive);
    expect(resultadoBigFive.get('amabilidad')).toEqual(3.5416666666666665); // primero saca los pesos de cada de los factores da cada adjetivo y despues saca el promedio
    expect(resultadoBigFive.get('neuroticismo')).toEqual(0.8333333333333334);
    expect(resultadoBigFive.get('extraversión')).toEqual(2.3333333333333335);
    expect(resultadoBigFive.get('responsabilidad')).toEqual(1.9166666666666667);
    expect(resultadoBigFive.get('apertura')).toEqual(2.75);
});
const johariBigfive = new JohariBigfive({
    definirColumnaEntorno: 'entorno',
    definirColumnaFecha: 'fecha',
    definirColumnaEvaluado: 'evaluado',
    definirColumnaEvaluador: 'evaluador',
    definirColumnasCalificaciones: ['actitud', 'felicidad', 'tristeza', 'lealtad'],
}, adjetivos, { max: 5, min: 0 }, 'mean');
test('probando sin evaluado johari big five', () => {
    let table = [
        {
            entorno: 'otros',
            fecha: '12-08-2018',
            evaluado: 'carlos',
            evaluador: 'miguel',
            actitud: 5,
            felicidad: 5,
            tristeza: 5,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'carlos',
            evaluador: 'miguel',
            actitud: 5,
            felicidad: 5,
            tristeza: 5,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 5,
            felicidad: 5,
            tristeza: 5,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 5,
            felicidad: 5,
            tristeza: 0,
            lealtad: 0
        }
    ];
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'arturo',
        evaluador: 'arturo',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    table.push({
        entorno: 'amigos',
        fecha: '12-08-2018',
        evaluado: 'miguel',
        evaluador: 'miguel',
        actitud: 2,
        felicidad: 3,
        tristeza: 2,
        lealtad: 0
    });
    let resultado = johariBigfive.analizar(table);
    // console.log('resultado', resultado)
    // resultado.forEach((entorno:any)=>{
    //     entorno['personas_entorno'].forEach((element:any) => {
    //         console.log(element)        
    //     });
    // })
    expect(resultado[0]["personas_entorno"][0]).toEqual({
        'nombre usuario': 'carlos',
        'ventana de johari': {
            zonaAbierta: {},
            zonaCiega: {
                amabilidad: 3.75,
                neuroticismo: 1.6666666666666667,
                'extraversión': 2.3333333333333335,
                responsabilidad: 1.9166666666666667,
                apertura: 2.75
            },
            zonaOculta: {},
            zonaDesconocida: {
                amabilidad: 0,
                neuroticismo: 0,
                'extraversión': 0,
                responsabilidad: 0,
                apertura: 0
            }
        },
        'opinion propia': {},
        'opinion otros': { "amabilidad": 2.8125,
            "apertura": 2.0625,
            "extraversión": 1.75,
            "neuroticismo": 1.25,
            "responsabilidad": 1.4375 }
    }); // primero saca los pesos de cada de los factores da cada adjetivo y despues saca el promedio
    expect(resultado[1]["personas_entorno"][0]).toEqual({
        'nombre usuario': 'carlos',
        'ventana de johari': {
            zonaAbierta: {},
            zonaCiega: {
                amabilidad: 3.75,
                neuroticismo: 1.6666666666666667,
                'extraversión': 2.3333333333333335,
                responsabilidad: 1.9166666666666667,
                apertura: 2.75
            },
            zonaOculta: {},
            zonaDesconocida: {
                amabilidad: 0,
                neuroticismo: 0,
                'extraversión': 0,
                responsabilidad: 0,
                apertura: 0
            }
        },
        'opinion propia': {},
        'opinion otros': {
            "amabilidad": 2.8125,
            "apertura": 2.0625,
            "extraversión": 1.75,
            "neuroticismo": 1.25,
            "responsabilidad": 1.4375,
        }
    });
    expect(resultado[1]["personas_entorno"][1]).toEqual({
        'nombre usuario': 'miguel',
        'ventana de johari': {
            zonaAbierta: {
                amabilidad: 2.9722222222222223,
                neuroticismo: 0.7777777777777778,
                'extraversión': 1.9222222222222223,
                responsabilidad: 1.5611111111111111,
                apertura: 2.283333333333333
            },
            zonaCiega: {},
            zonaOculta: {},
            zonaDesconocida: {
                amabilidad: 0,
                neuroticismo: 0,
                'extraversión': 0,
                responsabilidad: 0,
                apertura: 0
            }
        },
        'opinion propia': {
            "amabilidad": 1.375,
            "apertura": 1.0125,
            "extraversión": 0.825,
            "neuroticismo": 0.5,
            "responsabilidad": 0.6375
        },
        'opinion otros': {
            "amabilidad": 2.65625,
            "apertura": 2.0625,
            "extraversión": 1.75,
            "neuroticismo": 0.625,
            "responsabilidad": 1.4375
        }
    });
    expect(resultado[1]["personas_entorno"][2]).toEqual({
        'nombre usuario': 'arturo',
        'ventana de johari': {
            zonaAbierta: {},
            zonaCiega: {},
            zonaOculta: {
                amabilidad: 1.8333333333333333,
                neuroticismo: 0.6666666666666666,
                'extraversión': 1.0999999999999999,
                responsabilidad: 0.85,
                apertura: 1.3499999999999999
            },
            zonaDesconocida: {
                amabilidad: 0,
                neuroticismo: 0,
                'extraversión': 0,
                responsabilidad: 0,
                apertura: 0
            }
        },
        'opinion propia': {
            "amabilidad": 1.375,
            "apertura": 1.0125,
            "extraversión": 0.825,
            "neuroticismo": 0.5,
            "responsabilidad": 0.6375
        },
        'opinion otros': {}
    });
});
test('probando sin operacion johari big five', () => {
    const johariBigfive = new JohariBigfive({
        definirColumnaEntorno: 'entorno',
        definirColumnaFecha: 'fecha',
        definirColumnaEvaluado: 'evaluado',
        definirColumnaEvaluador: 'evaluador',
        definirColumnasCalificaciones: ['actitud', 'felicidad', 'tristeza', 'lealtad'],
    }, adjetivos, { max: 5, min: 0 });
    let table = [
        {
            entorno: 'otros',
            fecha: '12-08-2018',
            evaluado: 'carlos',
            evaluador: 'miguel',
            actitud: 5,
            felicidad: 5,
            tristeza: 5,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'carlos',
            evaluador: 'miguel',
            actitud: 5,
            felicidad: 5,
            tristeza: 5,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'carlos',
            actitud: 5,
            felicidad: 5,
            tristeza: 5,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'miguel',
            evaluador: 'sebastian',
            actitud: 5,
            felicidad: 5,
            tristeza: 0,
            lealtad: 0
        },
        {
            entorno: 'amigos',
            fecha: '12-08-2018',
            evaluado: 'carlos',
            evaluador: 'carlos',
            actitud: 5,
            felicidad: 5,
            tristeza: 0,
            lealtad: 0
        }
    ];
    let resultado = johariBigfive.analizar(table);
    expect(resultado[0]["personas_entorno"][0]).toEqual({
        'nombre usuario': 'carlos',
        'ventana de johari': {
            zonaAbierta: {},
            zonaCiega: {
                amabilidad: [5, 5, 1.25],
                apertura: [4.5, 3.75, 0],
                'extraversión': [4.5, 2.5, 0],
                neuroticismo: [0, 0, 5],
                responsabilidad: [4.5, 1.25, 0],
            },
            zonaOculta: {},
            zonaDesconocida: {
                amabilidad: [0],
                neuroticismo: [0],
                'extraversión': [0],
                responsabilidad: [0],
                apertura: [0]
            }
        },
        'opinion propia': {},
        'opinion otros': { "amabilidad": [5, 5, 1.25, 0],
            "apertura": [4.5, 3.75, 0, 0],
            "extraversión": [4.5, 2.5, 0, 0],
            "neuroticismo": [0, 0, 5, 0],
            "responsabilidad": [4.5, 1.25, 0, 0] }
    }); // primero saca los pesos de cada de los factores da cada adjetivo y despues saca el promedio
    expect(resultado[1]["personas_entorno"][0]).toEqual({
        'nombre usuario': 'carlos',
        'ventana de johari': {
            "zonaAbierta": {
                "amabilidad": [5, 5, 5, 5],
                "apertura": [4.5, 4.5, 3.75, 3.75],
                "extraversión": [4.5, 4.5, 2.5, 2.5],
                "neuroticismo": [0, 0, 0, 0],
                "responsabilidad": [4.5, 4.5, 1.25, 1.25,],
            },
            "zonaCiega": {
                "amabilidad": [1.25],
                "apertura": [0],
                "extraversión": [0],
                "neuroticismo": [5],
                "responsabilidad": [0]
            },
            "zonaDesconocida": {
                "amabilidad": [0,],
                "apertura": [0,],
                "extraversión": [0],
                "neuroticismo": [0],
                "responsabilidad": [0]
            },
            "zonaOculta": {}
        },
        'opinion propia': {
            "amabilidad": [5, 5, 0, 0],
            "apertura": [4.5, 3.75, 0, 0],
            "extraversión": [4.5, 2.5, 0, 0],
            "neuroticismo": [0, 0, 0, 0],
            "responsabilidad": [4.5, 1.25, 0, 0]
        },
        'opinion otros': {
            amabilidad: [5, 5, 1.25, 0],
            apertura: [4.5, 3.75, 0, 0],
            'extraversión': [4.5, 2.5, 0, 0],
            neuroticismo: [0, 0, 5, 0],
            responsabilidad: [4.5, 1.25, 0, 0]
        }
    });
    expect(resultado[1]["personas_entorno"][1]).toEqual({
        'nombre usuario': 'miguel',
        'ventana de johari': {
            "zonaAbierta": {},
            "zonaCiega": {
                "amabilidad": [5, 5, 5, 5, 1.25, 0],
                "apertura": [4.5, 4.5, 3.75, 3.75, 0, 0],
                "extraversión": [4.5, 4.5, 2.5, 2.5, 0, 0],
                "neuroticismo": [0, 0, 0, 0, 5, 0],
                "responsabilidad": [4.5, 4.5, 1.25, 1.25, 0, 0]
            },
            zonaOculta: {},
            zonaDesconocida: {
                amabilidad: [0, 0],
                neuroticismo: [0, 0],
                'extraversión': [0, 0],
                responsabilidad: [0, 0],
                apertura: [0, 0]
            }
        },
        'opinion propia': {},
        'opinion otros': {
            "amabilidad": [5, 5, 5, 5, 1.25, 0, 0, 0],
            "apertura": [4.5, 4.5, 3.75, 3.75, 0, 0, 0, 0],
            "extraversión": [4.5, 4.5, 2.5, 2.5, 0, 0, 0, 0],
            "neuroticismo": [0, 0, 0, 0, 5, 0, 0, 0],
            "responsabilidad": [4.5, 4.5, 1.25, 1.25, 0, 0, 0, 0],
        }
    });
    resultado.forEach((entorno) => {
        entorno['personas_entorno'].forEach((element) => {
            console.log(element);
        });
    });
});
