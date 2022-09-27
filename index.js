"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_GASTOS = void 0;
const fs_1 = require("fs");
const fs_2 = require("./fs");
const commander_1 = require("commander");
const process_1 = require("process");
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("prompts"));
exports.DATABASE_GASTOS = 'gastos.json';
class Gasto {
    constructor({ name, description, value }) {
        this.ID = JSON.parse((0, fs_1.readFileSync)(exports.DATABASE_GASTOS).toString()).length + 1;
        this.name = name;
        this.description = description;
        this.value = value;
    }
}
const getGastos = () => __awaiter(void 0, void 0, void 0, function* () {
    const gastos = yield (0, fs_2.readGastosFile)();
    return JSON.parse(gastos);
});
const createGasto = (gasto) => __awaiter(void 0, void 0, void 0, function* () {
    const gastos = yield getGastos();
    gastos.push(gasto);
    yield (0, fs_2.writeGastosFile)(gastos);
    return gasto;
});
const getGasto = (ID) => __awaiter(void 0, void 0, void 0, function* () {
    const gastos = yield getGastos();
    return gastos.find((gasto) => gasto.ID === ID);
});
const deleteGasto = (ID) => __awaiter(void 0, void 0, void 0, function* () {
    const gastos = yield getGastos();
    const newGastos = gastos.filter((gasto) => gasto.ID !== ID);
    yield (0, fs_2.writeGastosFile)(newGastos);
});
const cli = new commander_1.Command();
cli.name("Gastos").description("APP Gastos").version("1.0.0");
cli.command("nucba").description("first command").action(() => { console.log(chalk_1.default.red("bienvenido a Nucba")); });
cli.command("gastos").description("Administracion de gastos CLI").action(() => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = yield (0, prompts_1.default)({
        type: "select",
        name: "action",
        message: "¿Que accion queres hacer con tus gastos?",
        choices: [
            { title: "Agregar gasto",
                value: "C", },
            { title: "Ver listado de gastos",
                value: "R", },
            { title: "Eliminar gasto",
                value: "D", },
        ]
    });
    switch (action) {
        case 'C':
            const { name } = yield (0, prompts_1.default)({
                type: 'text',
                name: 'name',
                message: 'Ingresa el nombre del usuario',
            });
            const { description } = yield (0, prompts_1.default)({
                type: 'text',
                name: 'description',
                message: 'Describe el gasto',
            });
            const { value } = yield (0, prompts_1.default)({
                type: 'text',
                name: 'value',
                message: 'Coloca el valor del gasto',
            });
            yield createGasto(new Gasto({ name, description, value }));
            return console.log(chalk_1.default.green("Usuario creado con exito, felicitaciones"));
        case 'R':
            const data = yield getGastos();
            console.table(data);
        case 'D':
            const { id } = yield (0, prompts_1.default)({
                type: 'number',
                name: 'id',
                message: 'Ingresa el ID del gasto a eliminar',
            });
            try {
                yield deleteGasto(id);
                return console.log(chalk_1.default.green('El gasto se elimino con exito'));
            }
            catch (error) {
                return console.log(chalk_1.default.red(error));
            }
    }
}));
cli.parse(process_1.argv);
