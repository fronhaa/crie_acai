import { Request, Response } from 'express';
import { PaymentModel } from '../model/paymentModel';

class PaymentController {

    public async create(req: Request, res: Response): Promise<void> {

        const { nome, descricao, tipoPagamento } = req.body;

        const payment: PaymentModel | null = await PaymentModel.create(nome, descricao, tipoPagamento);

        if(!payment) {
            res.status(400).json({message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.', erro: true});
        }

        res.status(201).json({ok: true, message: 'Método de pagamento criado com sucesso!', data: payment});
    }

    public async getAll(req: Request, res: Response): Promise<void> {

        const payments: PaymentModel[] | [] = await PaymentModel.fetchAll();

        if(!payments) {
            res.status(204).json({message: 'Nenhum dado encontrado!'});
        }

        res.status(200).json({message: 'Métodos de pagamento retornados com sucesso!', data: payments});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const id: number = Number(req.params.id);

        const payment: number | null = await PaymentModel.delete(id);

        if(!payment) {
            res.status(404).json({message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.'});
        }

        res.status(200).json({message: 'Métodos de pagamento excluido com sucesso!', data: {id: payment}});
    }

    public async update(req: Request, res: Response): Promise<void> {
        const id: number = Number(req.params.id);
        const { nome, descricao, tipoPagamento } = req.body;

        const payment: PaymentModel | null = await PaymentModel.update(id, nome, descricao, tipoPagamento);

        if(!payment) {
            res.status(404).json({message: 'Algo deu errado na edição! Tente novamente em alguns segundo.'});
        }

        res.status(200).json({message: 'Métodos de pagamento editado com sucesso!', data: payment});
    }
}

export const paymentController = new PaymentController();