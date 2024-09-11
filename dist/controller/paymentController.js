"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
class PaymentController {
    constructor() {
        this.payments = [];
    }
    register(req, res) {
        const { name, description, type } = req.body;
        const status = true;
        const creation = new Date();
        const update = new Date();
        this.payments.push({ name, description, type, status, creation, update });
        res.status(200).json({ message: 'Método de pagamento criado com sucesso!', data: { name, description, type, status, creation, update } });
    }
    getPayments(req, res) {
        res.status(200).json({ message: 'Métodos de pagamento retornados com sucesso!', data: this.payments });
    }
}
exports.paymentController = new PaymentController();
