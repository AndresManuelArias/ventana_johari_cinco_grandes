"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
function encapsularHTML(esqueletoHTML) {
    return `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">              
    <title>
        ${esqueletoHTML.title}
    </title>
</head> 
<body>     
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>          
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>   
    <script src="http://www.chartjs.org/dist/2.7.1/Chart.bundle.js"></script>   
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>                   
    <h1> ${esqueletoHTML.title} </h1>
            ${esqueletoHTML.body} 

    <script>${esqueletoHTML.script} </script>
</body>    
</html>  `;
}
function graficarBarras(x, y, optionGrafi) {
    let option = {};
    option.data = {};
    option.data['labels'] = x;
    option.data['datasets'] = [];
    y.forEach((d) => {
        let datasets = {};
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        datasets['borderColor'] = `#${randomColor}`;
        datasets['backgroundColor'] = `#${randomColor}`;
        datasets.data = d.y;
        datasets.label = d.title;
        option.data['datasets'].push(datasets);
    });
    return `
    var ctx = document.getElementById('d${optionGrafi.id}').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: ${JSON.stringify(option.data)},
        options: {
            title: {
                display: true,
                text: '${optionGrafi.title}'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });`;
}
function canvas(id) {
    return `<canvas id="d${id}" width="441" height="220" class="chartjs-render-monitor" style="display: block; width: 441px; height: 220px;"></canvas>`;
}
class Graficar {
    constructor(configurarGraficar) {
        this.colectionElementGrafit = [];
        if (configurarGraficar) {
            this.configurarGraficar = configurarGraficar;
        }
    }
    // public graficaLine(data:JSON[],columX:string,columY:ColumY,tittle?:string):ElementGrafit{
    //     let indice = this.colectionElementGrafit.length;
    //     let elementGrafit = {
    //         element:canvas(indice),
    //         codigo:graficaLine(data,columX,columY, {id:indice,tittle:tittle})
    //     };
    //     this.colectionElementGrafit.push(elementGrafit);
    //     if( this.configurarGraficar){
    //         let body = "";
    //         let codigo = "";
    //         this.colectionElementGrafit.forEach((element) => {
    //             body += element.element;
    //             codigo += element.codigo
    //         });
    //         let htmlFile =encapsularHTML({title:this.configurarGraficar.title,
    //             body:body,
    //             script:codigo
    //         });          
    //         fs.writeFile(this.configurarGraficar.savePage,htmlFile, error => {
    //             if (error)
    //                 console.log(error);
    //             else
    //                 console.log(`grafica linea agregada`);
    //         });
    //     }
    //     return elementGrafit; 
    //  }
    graficarBarras(x, y, OptionGrafi) {
        let optionGrafi = OptionGrafi ? OptionGrafi : {};
        let indice = optionGrafi['id'] ? optionGrafi['id'] : this.colectionElementGrafit.length;
        optionGrafi['id'] = indice;
        let elementGrafit = {
            element: canvas(indice),
            codigo: graficarBarras(x, y, optionGrafi)
        };
        this.colectionElementGrafit.push(elementGrafit);
        if (this.configurarGraficar) {
            let body = "";
            let codigo = "";
            this.colectionElementGrafit.forEach((element) => {
                body += element.element;
                codigo += element.codigo;
            });
            let htmlFile = encapsularHTML({ title: this.configurarGraficar.title,
                body: body,
                script: codigo
            });
            fs.writeFile(this.configurarGraficar.savePage, htmlFile, (error) => {
                if (error)
                    console.log(error);
                else
                    console.log(`grafica barra agregada`);
            });
        }
        return elementGrafit;
    }
}
exports.Graficar = Graficar;
