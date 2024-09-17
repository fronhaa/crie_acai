import { client, dbQuery} from './database';

export class PaymentModel {
    private id: number = 0;
    private nome: string = '';
    private descricao: string = '';
    private tipo: string = '';
    private status: boolean = true;
    private dataCriacao: Date = new Date();
    private dataAtualizacao: Date = new Date();

    public getId(): number {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getStatus(): boolean {
       return this.status;
    }

    public getDataAtualizacao(): Date {
        return this.dataAtualizacao;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }

    public setStatus(status: boolean): void {
        this.status = status;
    }

    public setDataAtualizacao(dataAtualizacao: Date): void {
        this.dataAtualizacao = dataAtualizacao;
    }

    public static async create(nome: string, descricao: string, tipo_pagamento: string): Promise<PaymentModel | null> {

        if(!descricao) {
            descricao = null;
        }

        const sql: string = 'INSERT INTO formas_pagamento (ds_nome, ds_descricao, ds_tipo_pagamento) VALUES ($1, $2, $3) RETURNING nr_id, dt_data_atualizacao;';
        const result: any = await dbQuery(sql, [nome, descricao, tipo_pagamento]);

        if(result.length == 0 && !result[0].nr_id) {
            return null;
        }

        const id = result[0].nr_id;
        const dataAtualizacao = result[0].dt_data_atualizacao;
        const payment = new PaymentModel();

        payment.id = id;
        payment.nome = nome;
        payment.descricao = descricao;
        payment.tipo = tipo_pagamento;
        payment.status = true;
        payment.dataAtualizacao = dataAtualizacao;

        return payment;
    }

    public static async fetchAll(): Promise<PaymentModel[]> {
        
        const sql: string = 'SELECT * FROM formas_pagamento;';
        const result: any = await dbQuery(sql);

        if(result.length == 0) {
            return [];
        }

        return result.map((row: any) => {
            const payment = new PaymentModel();

            payment.id = row.nr_id;
            payment.nome = row.ds_nome;
            payment.descricao = row.ds_descricao;
            payment.tipo = row.ds_tipo_pagamento;
            payment.status = row.nr_status;
            payment.dataCriacao = row.dt_criacao;
            payment.dataAtualizacao = row.dt_data_atualizacao;

            return payment;
        });
    }

    public static async delete(id: number): Promise<number> | null {
        const sql: string = 'DELETE FROM formas_pagamento WHERE nr_id = $1 RETURNING nr_id;';
        const result: any = await dbQuery(sql, [id]);

        if(result.length == 0) {
            return null;
        }

        return result[0].nr_id;
    }

    public static async update(id: number, nome: string, descricao: string, tipo_pagamento: string): Promise<PaymentModel> | null {

        if(!descricao) {
            descricao = null;
        }

        const sql: string = 'UPDATE formas_pagamento SET ds_nome = $1, ds_descricao = $2, ds_tipo_pagamento = $3, dt_data_atualizacao = NOW() WHERE nr_id = $4 RETURNING nr_id, ds_nome, ds_descricao, ds_tipo_pagamento, nr_status, dt_criacao, dt_data_atualizacao;';
        const result: any = await dbQuery(sql, [nome, descricao, tipo_pagamento, id]);

        if(result.length == 0) {
            return null;
        }

        const row = result[0];
        const payment = new PaymentModel();

        payment.id = row.nr_id;
        payment.nome = row.ds_nome;
        payment.descricao = descricao;
        payment.tipo = row.ds_tipo_pagamento;
        payment.status = row.nr_status;
        payment.dataCriacao = row.dt_criacao;
        payment.dataAtualizacao = row.dt_data_atualizacao;

        return payment;
    }
}