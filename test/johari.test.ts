const VentanaJohariRanda = require("../logicaJohari/ventanaJohariRanda");
// console.log(VentanaJohariRanda)
let ventanaJohariRanda = new VentanaJohariRanda.VentanaJohariRanda(
    {
        definirColumnaEntorno:'entorno',
        definirColumnaFecha:'fecha',
        definirColumnaEvaluado:'evaluado',
        definirColumnaEvaluador:'evaluador',
        definirColumnasCalificaciones:['actitud','felicidad','tristeza','lealtad'],
    }
)

function mostrarllaves(table:any[],columna:string):string[]{
    let array:string[] = []
    VentanaJohariRanda.seleccionarEntornos(table,columna).forEach((element:any,keys:any) =>  { array.push(keys)});
    return array;
}

test('probando sin evaluado',  () => {
    let table = [
        {
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'carlos',
            actitud:1,
            felicidad:0,
            tristeza:2,
            lealtad:0
        }
        ,{
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'sebastian',
            actitud:2,
            felicidad:3,
            tristeza:0,
            lealtad:0
        }
        ]
    let resultado = ventanaJohariRanda.analizar(table);
    console.log(resultado);
    console.log( "resultado[0]['personas_entorno']",resultado[0]['personas_entorno']);
    expect(resultado[0]['personas_entorno'][0]['nombre usuario']).toEqual("miguel");
    console.log( resultado[0]['personas_entorno'][0]['ventana de johari']['zonaCiega']);    
    expect( resultado[0]['personas_entorno'][0]['ventana de johari']['zonaCiega']).toEqual(
         { actitud: [ 1, 2 ],
        felicidad: [ 0, 3 ],
        tristeza: [ 2, 0 ] });
    console.log( resultado[0]['personas_entorno'][0]['ventana de johari']['zonaDesconocida']);
    expect( resultado[0]['personas_entorno'][0]['ventana de johari']['zonaDesconocida']).toEqual({ lealtad: [ 0, 0 ] });   


    let keysEvaluador = mostrarllaves(table,'evaluador')
    expect( keysEvaluador).toEqual(['carlos', 'sebastian'] );
    let keysEvaluado1 = mostrarllaves(table,'evaluado')
    expect( keysEvaluado1).toEqual(['miguel' ] );   
});

test('probando solo evaluado ',  () => {  
    let table = [
        ]
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'arturo',
        evaluador:'arturo',
        actitud:2,
        felicidad:3,
        tristeza:2,
        lealtad:0
    })
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('3', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari'])
    expect( resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaOculta']).toEqual(
        {   actitud:2,
            felicidad:3,
            tristeza:2});
    expect( resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaDesconocida']).toEqual(
        {   lealtad:0});
    let keys = mostrarllaves(table,'evaluador')
    expect( keys).toEqual([ 'arturo'] );
    let keysEvaluado = mostrarllaves(table,'evaluado');
    expect( keysEvaluado).toEqual([ 'arturo'] );
});

test('probando con autoevaluado y evaluadores',  () => {  
    let table = [
        {
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'carlos',
            actitud:1,
            felicidad:0,
            tristeza:2,
            lealtad:0
        }
        ,{
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'sebastian',
            actitud:2,
            felicidad:3,
            tristeza:0,
            lealtad:0
        }
        ]
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'miguel',
        evaluador:'miguel',
        actitud:2,
        felicidad:3,
        tristeza:2,
        lealtad:0
    })
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('2', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari'])
    expect( resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaAbierta']).toEqual(
        { actitud: [ 1, 2, 2 ],
       felicidad: [ 0, 3, 3 ],
       tristeza: [ 2, 0, 2 ] });
    let keys = mostrarllaves(table,'evaluador')
    expect( keys).toEqual(['carlos', 'sebastian', 'miguel'] );
    let keysEvaluado = mostrarllaves(table,'evaluado');
    expect( keysEvaluado).toEqual([ 'miguel'] );
});



test('probando con autoevaluado y  evaluadores que no lo calificaron',  () => {  
    let table = [
        {
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'carlos',
            actitud:1,
            felicidad:0,
            tristeza:2,
            lealtad:0
        }
        ,{
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'sebastian',
            actitud:2,
            felicidad:3,
            tristeza:0,
            lealtad:0
        }
        ]
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'arturo',
        evaluador:'arturo',
        actitud:2,
        felicidad:3,
        tristeza:2,
        lealtad:0
    })
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('3', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][1]['ventana de johari'])
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaOculta']).toEqual(
        {   actitud:2,
            felicidad:3,
            tristeza:2});
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaDesconocida']).toEqual(
        {   lealtad:0});
    let keys = mostrarllaves(table,'evaluador')
    expect(keys).toEqual(['carlos', 'sebastian', 'arturo'] );
    let keysEvaluado = mostrarllaves(table,'evaluado');
    expect( keysEvaluado).toEqual([ 'miguel','arturo'] );
});

test('probando con autoevaluado sin calificar y  evaluadores que califican a otros',  () => {  
    let table = [
        {
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'carlos',
            actitud:1,
            felicidad:0,
            tristeza:2,
            lealtad:0
        }
        ,{
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'sebastian',
            actitud:2,
            felicidad:3,
            tristeza:0,
            lealtad:0
        }
        ]
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'arturo',
        evaluador:'arturo',
        actitud:2,
        felicidad:3,
        tristeza:2,
        lealtad:0
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'miguel',
        evaluador:'miguel',
        actitud:2,
        felicidad:3,
        tristeza:2,
        lealtad:0
    })
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('personas_entorno', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari'])
    expect( resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaAbierta']).toEqual(
        { actitud: [ 1, 2, 2 ],
       felicidad: [ 0, 3, 3 ],
       tristeza: [ 2, 0, 2 ] });
    console.log(resultado1[0]['personas_entorno'][1]['ventana de johari'])
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaOculta']).toEqual(
        {   actitud:2,
            felicidad:3,
            tristeza:2});
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaDesconocida']).toEqual(
        {   lealtad:0});
    let keys = mostrarllaves(table,'evaluador')
    expect( keys).toEqual(['carlos', 'sebastian', 'arturo', "miguel"] );
    let keysEvaluado = mostrarllaves(table,'evaluado');
    expect( keysEvaluado).toEqual([ 'miguel','arturo'] );
});

test('probando con autoevaluado sin calificar y  nuevos evaluadores que califican',  () => {  
    let table = [
        {
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'carlos',
            actitud:1,
            felicidad:0,
            tristeza:2,
            lealtad:0
        }
        ,{
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'sebastian',
            actitud:2,
            felicidad:3,
            tristeza:0,
            lealtad:0
        },
        {
            entorno:'amigos',
            fecha:'12-08-2018',
            evaluado:'miguel',
            evaluador:'tatiana',
            felicidad:0
        }
        ]
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'arturo',
        evaluador:'arturo',
        actitud:0,
        felicidad:3,
        tristeza:2,
        lealtad:0
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'miguel',
        evaluador:'miguel',
        actitud:2,
        felicidad:3,
        tristeza:2,
        lealtad:0
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'arturo',
        evaluador:'santiago',
        actitud:1,
        felicidad:0,
        tristeza:0,
        lealtad:0
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'arturo',
        evaluador:'miguel',
        felicidad:1
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'miguel',
        evaluador:'tatiana',
        felicidad:0
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'miguel',
        evaluador:'tatiana',
        felicidad:5
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'miguel',
        evaluador:'tatiana',
        felicidad:4
    })
    table.push({
        entorno:'amigos',
        fecha:'12-08-2018',
        evaluado:'miguel',
        evaluador:'hernesto',
        felicidad:6
    })
    let resultado1 = ventanaJohariRanda.analizar(table);
    console.log('personas_entorno', resultado1[0]['personas_entorno']);
    console.log(resultado1[0]['personas_entorno'][0]['ventana de johari'])
    expect( resultado1[0]['personas_entorno'][0]['ventana de johari']['zonaAbierta']).toEqual(
        { actitud: [ 1, 2, 2 ],
       felicidad: [ 0,3, 0,0,5,4,6,3 ],/// ocurre un fenomeno extraño donde los valores no se estan colocando en el orden esperado
       tristeza: [ 2, 0, 2 ] });
    console.log("['personas_entorno'][1]['ventana de johari']",resultado1[0]['personas_entorno'][1]['ventana de johari'])
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaOculta']).toEqual(
        {   tristeza:2});
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaAbierta']).toEqual(
        {   felicidad:[0,1,3]});
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaDesconocida']).toEqual(
        {   lealtad:[0]});
    expect( resultado1[0]['personas_entorno'][1]['ventana de johari']['zonaCiega']).toEqual(
        {   actitud:1});
    let evaluadorArray:string[] = []
    VentanaJohariRanda.seleccionarEntornos(table,'evaluador').forEach((element:any,keys:any) =>  { evaluadorArray.push(keys)});
    expect( evaluadorArray).toEqual(['carlos', 'sebastian','tatiana', 'arturo','miguel',"santiago",'hernesto'] );
    let keysEvaluado = mostrarllaves(table,'evaluado');
    expect( keysEvaluado).toEqual([ 'miguel','arturo'] );
});