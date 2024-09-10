import { Request, Response } from 'express';

type Payment = {
    name: string,
    description: string,
    type: string,
    status: boolean,
    creation: Date,
    update: Date
};

class PaymentController {
    private payments: Payment[] = [];

    public register(req: Request, res: Response): void {
        const {name, description, type}: {name: string, description: string, type: string} = req.body;
        const status: boolean = true;
        const creation: Date = new Date();
        const update: Date = new Date();

        this.payments.push({name, description, type, status, creation, update});

        res.status(200).json({message: 'Método de pagamento criado com sucesso!', data: {name, description, type, status, creation, update}});
    }

    public getPayments(req: Request, res: Response): void {
        res.status(200).json({message: 'Métodos de pagamento retornados com sucesso!', data: this.payments});
    }
}

export const paymentController = new PaymentController();