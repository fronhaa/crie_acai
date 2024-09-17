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
exports.paymentController = void 0;
const paymentModel_1 = require("../model/paymentModel");
class PaymentController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, descricao, tipoPagamento } = req.body;
            const payment = yield paymentModel_1.PaymentModel.create(nome, descricao, tipoPagamento);
            if (!payment) {
                res.status(400).json({ message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.', erro: true });
            }
            res.status(201).json({ ok: true, message: 'Método de pagamento criado com sucesso!', data: payment });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield paymentModel_1.PaymentModel.fetchAll();
            if (!payments) {
                res.status(204).json({ message: 'Nenhum dado encontrado!' });
            }
            res.status(200).json({ message: 'Métodos de pagamento retornados com sucesso!', data: payments });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const payment = yield paymentModel_1.PaymentModel.delete(id);
            if (!payment) {
                res.status(404).json({ message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.' });
            }
            res.status(200).json({ message: 'Métodos de pagamento excluido com sucesso!', data: { id: payment } });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { nome, descricao, tipoPagamento } = req.body;
            const payment = yield paymentModel_1.PaymentModel.update(id, nome, descricao, tipoPagamento);
            if (!payment) {
                res.status(404).json({ message: 'Algo deu errado na edição! Tente novamente em alguns segundo.' });
            }
            res.status(200).json({ message: 'Métodos de pagamento editado com sucesso!', data: payment });
        });
    }
}
exports.paymentController = new PaymentController();
