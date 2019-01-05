"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const bigFiveJohari_1 = require("./bigFiveJohari");
var datosVentanaDeHonary = fs_1.default.readFileSync('../data_base/ventanaDeHonary.json', 'utf-8');
var objectVentanaDeHonary = JSON.parse(datosVentanaDeHonary);
var factorBigfive1 = { 'apertura': ['físgón', 'curioso', 'valiente', 'audaz', 'temerario', 'inquieto', 'imprudente'], 'noApertura': ['tonto', 'ignorante'], 'extroversion': ['simpático', 'energico', 'extrovertido', 'amigable', 'charlatán', 'cariñoso', 'espontáneo'], 'introversion': ['callado', 'indiferente', 'distante', 'reflexivo', 'frío',], 'obedienciaNormas': ['atento', 'maduro', 'previsible', 'erudito'], 'noObedienciaNormas': ['flexible', 'irresponsable', 'irracional'], 'neuroticismo': ['caótico', 'tenso', 'pesimista', 'desconfiado', 'tímido', 'cobarde', 'violento', 'dramatico', 'inseguro', 'impaciente'], 'noNeurotismo': ['tranquilo', 'alegre', 'relajado', 'pasivo', 'feliz'], 'noAmable': ['irrespetuoso', 'mezquino', 'sombrio', 'hostil', 'egoísta', 'insensible', 'prepotente', 'vulgar', 'rencoroso'], 'amable': ['amable', 'protector', 'sensible', 'generoso', 'modesto', 'envidioso'] };
let personaEntorno = objectVentanaDeHonary[0].personas_entorno[0];
let respuesta = bigFiveJohari_1.bigfiveJohariPerson(factorBigfive1, personaEntorno);
for (let zona in respuesta.ventanaDeJohariBigFive) {
    console.log(zona, respuesta.ventanaDeJohariBigFive[zona]);
}
let ventanaBigFiveJohari = bigFiveJohari_1.bigfiveJohariEntorno(factorBigfive1, objectVentanaDeHonary[0]);
fs_1.default.writeFileSync('../data_base/resultadoVentanaDeHonaryBigfive.json', JSON.stringify(ventanaBigFiveJohari));
