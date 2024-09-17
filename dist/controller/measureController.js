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
exports.measureController = void 0;
const measureModel_1 = require("../model/measureModel");
class MeasureController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, descricao } = req.body;
            const measure = yield measureModel_1.MeasureModel.create(nome, descricao);
            if (!measure) {
                res.status(400).json({ message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.', erro: true });
            }
            res.status(201).json({ ok: true, message: 'Unidade de medida criada com sucesso!', data: measure });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const measures = yield measureModel_1.MeasureModel.fetchAll();
            if (!measures) {
                res.status(204).json({ message: 'Nenhum dado encontrado!' });
            }
            res.status(200).json({ message: 'Unidade de medida retornados com sucesso!', data: measures });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const measure = yield measureModel_1.MeasureModel.delete(id);
            if (!measure) {
                res.status(404).json({ message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.' });
            }
            res.status(200).json({ message: 'Unidade de medida excluido com sucesso!', data: { id: measure } });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { nome, descricao } = req.body;
            const measure = yield measureModel_1.MeasureModel.update(id, nome, descricao);
            if (!measure) {
                res.status(404).json({ message: 'Algo deu errado na edição! Tente novamente em alguns segundo.' });
            }
            res.status(200).json({ message: 'Unidade de medida editado com sucesso!', data: measure });
        });
    }
}
exports.measureController = new MeasureController();
