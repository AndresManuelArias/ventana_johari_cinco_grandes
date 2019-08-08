import * as ventanaJohariRanda from "../logicaJohari/ventanaJohariRanda";
import * as bigFive from "../bigFive/bigFive";


export class JohariBigfive {
    private ventanaJohariRanda:ventanaJohariRanda.VentanaJohariRanda
    private bigFive:bigFive.BigFive
    constructor(columnasAnalizar:ventanaJohariRanda.ColumnasAnalizar,
        tablaPuntajes:bigFive.TablaPuntajes[],escalaPuntaje:bigFive.EscalaPuntaje,operacion?:string
        ){
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
}