import { Request, Response } from 'express';
import { MeasureModel } from '../model/measureModel';

class MeasureController {

    public async create(req: Request, res: Response): Promise<void> {

        const { nome, descricao } = req.body;

        const measure: MeasureModel | null = await MeasureModel.create(nome, descricao);

        if(!measure) {
            res.status(400).json({message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.', erro: true});
        }

        res.status(201).json({ok: true, message: 'Unidade de medida criada com sucesso!', data: measure});
    }

    public async getAll(req: Request, res: Response): Promise<void> {

        const measures: MeasureModel[] | [] = await MeasureModel.fetchAll();

        if(!measures) {
            res.status(204).json({message: 'Nenhum dado encontrado!'});
        }

        res.status(200).json({message: 'Unidade de medida retornados com sucesso!', data: measures});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const id: number = Number(req.params.id);

        const measure: number | null = await MeasureModel.delete(id);

        if(!measure) {
            res.status(404).json({message: 'Algo deu errado na exclusão! Tente novamente em alguns segundo.'});
        }

        res.status(200).json({message: 'Unidade de medida excluido com sucesso!', data: {id: measure}});
    }

    public async update(req: Request, res: Response): Promise<void> {
        const id: number = Number(req.params.id);
        const { nome, descricao } = req.body;

        const measure: MeasureModel | null = await MeasureModel.update(id, nome, descricao);

        if(!measure) {
            res.status(404).json({message: 'Algo deu errado na edição! Tente novamente em alguns segundo.'});
        }

        res.status(200).json({message: 'Unidade de medida editado com sucesso!', data: measure});
    }
}

export const measureController = new MeasureController();