import * as fs from 'fs';
import  * as Chart from 'chart.js';
 

interface EsqueletoHTML {
    title:string,
    body:string,
    script:string
}
function encapsularHTML(esqueletoHTML:EsqueletoHTML):string{
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

interface ColumY{
    label:string,
    data:string
}
// function converDataLine(data:JSON[],columX:string,columY:ColumY):Data{ 
//     let labels:Map<string,number[]> = new Map()
//     let dataColumnX = data.map(row =>{ 
//         let arrayGuardar:number[] = labels.get(row[columY.label]);
//         if(arrayGuardar){
//             labels.set(row[columY.label],arrayGuardar.concat([row[columY.data]]))
//         }else{
//             labels.set(row[columY.label],[]);
//         }
//         return row[columX]
//     });
//     let datasets:Datasets[] = [];
//     labels.forEach((row,key) => {
//         var randomColor = Math.floor(Math.random()*16777215).toString(16);
//         datasets.push({
//             label:key,
//             data:row,
//             borderColor:`#${randomColor}`,
//             backgroundColor:`#${randomColor}`,
//             fill:false,
//             lineTension:0.1
//         });
//     });
//     return {
//         labels:dataColumnX,
//         datasets:datasets
//     }
// }
interface Y {
    y:number[],title:string
}
function  GraficarBarras():(x:Array<string | string[]>,y:Y[],optionGrafi?:OptionGrafi)=>string{
    let randomColor:string[] = []
    return (x:Array<string | string[]>,y:Y[],optionGrafi?:OptionGrafi):string =>{
        let option :Chart.ChartConfiguration = {};
        option.data = {}    
        option.data['labels'] = x;
        option.data['datasets'] = [];
        y.forEach((d,index)=>{
            let datasets:Chart.ChartDataSets = {}
            if(randomColor.length < y.length){
                randomColor.push(Math.floor(Math.random()*16777215).toString(16));
            }
            datasets['borderColor'] = `#${randomColor[index]}`;
            datasets['backgroundColor'] = `#${randomColor[index]}`;
            datasets.data = d.y;
            datasets.label = d.title;
            option.data['datasets'].push(datasets);
        })
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
        });`
    }
}
let graficarBarras = GraficarBarras()

function Torta():(x:Array<string | string[]>,y:Y[],optionGrafi?:OptionGrafi)=>string {
    let  colorX:string[] = []

    return (x:Array<string | string[]>,y:Y[],optionGrafi?:OptionGrafi):string =>{
    let option :Chart.ChartConfiguration = {};
    option.data = {}    
    option.data['labels'] = x;
    option.data['datasets'] = [];
    if(colorX.length < x.length){
        x.forEach(()=>{
            colorX.push(`#${Math.floor(Math.random()*16777215).toString(16)}` );
        })
    }

    y.forEach((d)=>{
        let datasets:Chart.ChartDataSets = {}

        datasets['backgroundColor'] = colorX;
        datasets.data = d.y;
        datasets.label = d.title;
        option.data['datasets'].push(datasets);
    })
    return `
    var ctx = document.getElementById('d${optionGrafi.id}').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: ${JSON.stringify(option.data)},
        options: {
            title: {
                display: true,
                text: '${optionGrafi.title}'
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        console.log('data',data)
                        console.log('tooltipItem',tooltipItem)
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || ''
                        var labels  = data.labels[tooltipItem.index]
                        var total = data.datasets[tooltipItem.datasetIndex].data.reduce((a,b)=>a+b)
                        var valuePorcentaje = Math.floor(value/total*100)
                        return labels+' - '+label+": "+valuePorcentaje+" %";
                    }
                }
            }
        }
    });`
 }
}
let  graficarTorta =   Torta()
//  function graficaLine(data:JSON[],columX:string,columY:ColumY,optionGrafi:OptionGrafi):string {
//     return  `
//          var ctx = document.getElementById('d${optionGrafi.id}').getContext('2d');
//          window.myLine = Chart.Line(ctx, {
//              data: ${JSON.stringify(converDataLine(data,columX,columY))},
//              options: {
//                  responsive: true,
//                  hoverMode: 'index',
//                  stacked: false,
//                  title: {
//                      display: true,
//                      text: '${optionGrafi.tittle}'
//                  },
//                  scales: {
//                      yAxes: [{
//                          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
//                          display: true,
//                          position: 'left',
//                          id: 'y-axis-1',
//                      }, {
//                          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
//                          display: true,
//                          position: 'right',
//                          id: 'y-axis-2',
 
//                          // grid line settings
//                          gridLines: {
//                              drawOnChartArea: false, // only want the grid lines for one axis to show up
//                          },
//                      }],
//                  }
//              }
//          });`
//  }

 interface ConfigurarGraficar {
    savePage:string
    title:string
 }
 interface ElementGrafit{
    element:string
    codigo:string
 }
 interface OptionGrafi{
     id:number|string,
     title:string
 }
 function canvas(id:number):string{
     return `<canvas id="d${id}" width="441" height="220" class="chartjs-render-monitor" style="display: block; width: 441px; height: 220px;"></canvas> <hr > \n`
 }
 export class Graficar{
    private configurarGraficar:ConfigurarGraficar
    private colectionElementGrafit:ElementGrafit[]
    constructor(configurarGraficar?:ConfigurarGraficar){
        this.colectionElementGrafit = [{element:"",codigo:""}];
        if(configurarGraficar){
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
    grafit(funcionGrafica:(x:Array<string | string[]>,y:Y[],OptionGrafi?:OptionGrafi)=>string,x:Array<string | string[]>,y:Y[],OptionGrafi?:OptionGrafi):ElementGrafit{      
        let optionGrafi:OptionGrafi|any = OptionGrafi?OptionGrafi:{}
        let indice =  optionGrafi['id'] ? optionGrafi['id']:this.colectionElementGrafit.length;
        optionGrafi['id'] = indice;
        let elementGrafit:ElementGrafit = {
            element:canvas(indice),
            codigo:funcionGrafica(x,y,optionGrafi)
        };
        this.colectionElementGrafit.push(elementGrafit);
        if( this.configurarGraficar){
            let body = "";
            let codigo = "";
            this.colectionElementGrafit.forEach((element) => {
                body += element.element;
                codigo += element.codigo
            });
            let htmlFile =encapsularHTML({title:this.configurarGraficar.title,
                body:body,
                script:codigo
            });          
            fs.writeFile(this.configurarGraficar.savePage,htmlFile, (error:any) => {
                if (error)
                    console.log(error);
                else
                    console.log('body',body,
                        'body',codigo)
                    console.log(`grafica barra agregada`);
            });
        }
        return elementGrafit; 
         
    }
     graficarBarras(x:Array<string | string[]>,y:Y[],OptionGrafi?:OptionGrafi):ElementGrafit{
       return this.grafit(graficarBarras,x,y,OptionGrafi)
     }
     graficarTorta(x:Array<string | string[]>,y:Y[],OptionGrafi?:OptionGrafi):ElementGrafit{
        return this.grafit(graficarTorta,x,y,OptionGrafi)
      }
 }