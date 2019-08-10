import * as ventanaJohariRanda from "../logicaJohari/ventanaJohariRanda";
import * as bigFive from "../bigFive/bigFive";


export class JohariBigfive {
    private ventanaJohariRanda:ventanaJohariRanda.VentanaJohariRanda
    private bigFive:bigFive.BigFive
    private columnasAnalizar:ventanaJohariRanda.ColumnasAnalizar
    private operacion:string
    constructor(columnasAnalizar:ventanaJohariRanda.ColumnasAnalizar,
        tablaPuntajes:bigFive.TablaPuntajes[],escalaPuntaje:bigFive.EscalaPuntaje,operacion?:string
        ){
            this.operacion = operacion;
        this.columnasAnalizar = columnasAnalizar;
        this.ventanaJohariRanda = new ventanaJohariRanda.VentanaJohariRanda( columnasAnalizar)
        this.bigFive = new bigFive.BigFive(tablaPuntajes,  escalaPuntaje,operacion)
    }
    analizar(table:ventanaJohariRanda.fila[]){
        let resultado:ventanaJohariRanda.DatosEntorno[] = this.ventanaJohariRanda.analizar(table);
        return resultado.map((entorno)=>{
            entorno['personas_entorno'] =entorno['personas_entorno'].map((personas_entorno:any)=>{
                personas_entorno['ventana de johari'].zonaAbierta = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaAbierta)
                personas_entorno['ventana de johari'].zonaCiega = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaCiega)
                personas_entorno['ventana de johari'].zonaOculta = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaOculta)
                personas_entorno['ventana de johari'].zonaDesconocida = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['ventana de johari'].zonaDesconocida)
                personas_entorno['opinion propia'] = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['opinion propia'])
                personas_entorno['opinion otros'] = this.bigFive.sacarPuntajeBigFiveJson(personas_entorno['opinion otros'])
                return personas_entorno;                
            })
            return entorno
        })
    }
    csvAnalizar(table:ventanaJohariRanda.fila[]){
        // let columnasSeleccionar = ventanaJohariRanda.columnasSeleccionar( this.columnasAnalizar )
        let nuevaTabla:ventanaJohariRanda.fila[] = []

        let tableMap =   table.map(fila => { 

           let {entorno, fecha, evaluado, evaluador} = fila
           for(let key in fila) {
                fila[key]= [fila[key]]
           }
           let {amabilidad,
            neuroticismo,
            extraversión,
            responsabilidad,
            apertura}=this.bigFive.sacarPuntajeBigFiveJson(fila)
            console.log('amabilidad', amabilidad,
                'neuroticismo',             neuroticismo,
                'extraversión',             extraversión,
                'responsabilidad',             responsabilidad,
                'apertura'   ,          apertura)
            return {entorno, fecha, evaluado, evaluador, amabilidad,
                neuroticismo,
                extraversión,
                responsabilidad,
                apertura}
        })
        if(this.operacion){
            return tableMap
        }else{
             tableMap.forEach(fila =>{
                for(let nuevaFila = 0;nuevaFila < fila.amabilidad.length;nuevaFila++){
                    let {entorno, fecha, evaluado, evaluador, amabilidad,
                        neuroticismo,
                        extraversión,
                        responsabilidad,
                        apertura} = fila
                    nuevaTabla.push({entorno, fecha, evaluado, evaluador, 
                        amabilidad:amabilidad[nuevaFila],
                        neuroticismo:neuroticismo[nuevaFila],
                        extraversión:extraversión[nuevaFila],
                        responsabilidad:responsabilidad[nuevaFila],
                        apertura:apertura[nuevaFila]})
                }
            })
            return nuevaTabla
        }
    }    
}