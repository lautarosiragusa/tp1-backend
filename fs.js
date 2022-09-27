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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readGastosFile = exports.writeGastosFile = void 0;
const promises_1 = require("fs/promises");
const _1 = require(".");
const writeGastosFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, promises_1.writeFile)(_1.DATABASE_GASTOS, JSON.stringify(data));
    return null;
});
exports.writeGastosFile = writeGastosFile;
const readGastosFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gastos = (yield (0, promises_1.readFile)(_1.DATABASE_GASTOS)).toString();
        return gastos;
    }
    catch (error) {
        yield (0, exports.writeGastosFile)([]);
        return "[]";
    }
});
exports.readGastosFile = readGastosFile;
