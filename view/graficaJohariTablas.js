// graficacion
const fs = require('fs');


function tipofilaSegun(lado){
    let estilo;
    switch (lado) {
        case 'abierta':
            estilo = 'class="bg-success"';
            break;
        case 'ciega':
            estilo = 'class="bg-danger"';
        break;
        case 'oculta':
            estilo = 'class="bg-warning"';
        break;
        case 'desconocida':
            estilo = 'class="bg-info"';
        break;
        default:
            break;
    }
    return estilo;
}
function generarTablas(personas){
    let tablas = '';
    for(let ventana in  personas['ventana de johari']){
        console.log( ventana);
        tablas += `<tr ${tipofilaSegun(ventana)}> <th> ${ventana} </th>  <td>`;
        personas['ventana de johari'][ventana].forEach((espacio)=>{
            tablas += ` ${espacio.comportamiento} ${espacio.puntaje.toFixed(2)},`;
        });
        tablas += ` </td></tr>`;
    }
    return tablas;
}

function separarPersonas(datos){
    let personasgraficadas = "";
    datos.personas_entorno.forEach((personas)=>{
        personasgraficadas += `  
        <section class="panel panel-default">
            <h3 class="panel-title panel-heading">${personas['nombre usuario']}</h3>`;
        personasgraficadas += `
            <table class="table table-bordered panel-body" >
                <thead class="bg-primary text-white">
                    <tr>
                        <th>
                            Zona
                        </th>
                        <th>
                            Resultados
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${generarTablas(personas)}
                </tbody>
            </table>
        </section>`;
    });
    return personasgraficadas;
}

function separarEntornos(datos){
    return `<article> <h2> ${datos.nombre_entorno} </h2> ${separarPersonas(datos)} </article>`;
}


function graficarVentanas(datos){
    let ventanasGraficadas = '';
    datos.forEach(function(entorno) {
        ventanasGraficadas +=  separarEntornos(entorno);
    }, this);
    return ventanasGraficadas;
}
function encapsularHTML(data){
    return `<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Ventana johari</title>
        <link rel=stylesheet type="text/css" href="./stylesheets/bootstrap.min.css">                    
    </head> 
        <body>
            <h1> Ventana de johari</h1>
            ${data}
            <script src="./javascript/vendor/jquery-3.1.0.min.js"> </script>    
            <script src="./javascript/vendor/bootstrap.min.js"> </script>
        </body>    
    </html>  `;
}
class GraficaJohariTablas {
    lugarGraficarResultados(lugarGraficos){
        this.lugarGraficos = lugarGraficos;
    }
    generarPaginaResultados(data){
        fs.writeFileSync(this.lugarGraficos, encapsularHTML(graficarVentanas(data)));
    }
}
function graficacionTablasDesdeAchivo(){
    let graficaJohariTablas = new GraficaJohariTablas();
    graficaJohariTablas.lugarGraficarResultados('../public/resultados.html');
    let ventana = fs.readFileSync('../resultadoGuardado/ventanaDeHonary.json', 'utf-8');
    console.log(ventana);
    let resultado = JSON.parse( ventana);
    graficaJohariTablas.generarPaginaResultados(resultado);
}
function graficacionTablasDesdeDatos(data){
    let graficaJohariTablas = new GraficaJohariTablas();
    graficaJohariTablas.lugarGraficarResultados('./public/resultados.html');
    let ventana = data;
    graficaJohariTablas.generarPaginaResultados(ventana);
}

module.exports = {graficacionTablasDesdeAchivo:graficacionTablasDesdeAchivo,
    graficacionTablasDesdeDatos:graficacionTablasDesdeDatos};
