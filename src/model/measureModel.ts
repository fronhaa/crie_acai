import { client, dbQuery} from './database';

export class MeasureModel {
    private id: number = 0;
    private nome: string = '';
    private descricao: string = '';
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

    public getDataAtualizacao(): Date {
        return this.dataAtualizacao;
    }

    public getDataCriacao(): Date {
        return this.dataCriacao;
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

    public setDataAtualizacao(dataAtualizacao: Date): void {
        this.dataAtualizacao = dataAtualizacao;
    }

    public setDataCriacao(dataCriacao: Date): void {
        this.dataCriacao = dataCriacao;
    }

    public static async create(nome: string, descricao: string): Promise<MeasureModel | null> {

        if(!descricao) {
            descricao = null;
        }

        const sql: string = 'INSERT INTO unidade_medida (ds_nome, ds_descricao) VALUES ($1, $2) RETURNING nr_id, dt_data_criacao, dt_data_atualizacao;';
        const result: any = await dbQuery(sql, [nome, descricao]);

        if(result.length == 0 && !result[0].nr_id) {
            return null;
        }

        const id = result[0].nr_id;
        const dataAtualizacao = result[0].dt_data_atualizacao;
        const dataCriacao = result[0].dt_data_criacao;
        const measure = new MeasureModel();

        measure.id = id;
        measure.nome = nome;
        measure.descricao = descricao;
        measure.dataCriacao = dataCriacao;
        measure.dataAtualizacao = dataAtualizacao;

        return measure;
    }

    public static async fetchAll(): Promise<MeasureModel[]> {
        
        const sql: string = 'SELECT * FROM unidade_medida;';
        const result: any = await dbQuery(sql);

        if(result.length == 0) {
            return [];
        }

        return result.map((row: any) => {
            const measure = new MeasureModel();

            measure.id = row.nr_id;
            measure.nome = row.ds_nome;
            measure.descricao = row.ds_descricao;
            measure.dataCriacao = row.dt_data_criacao;
            measure.dataAtualizacao = row.dt_data_atualizacao;

            return measure;
        });
    }

    public static async delete(id: number): Promise<number> | null {
        const sql: string = 'DELETE FROM unidade_medida WHERE nr_id = $1 RETURNING nr_id;';
        const result: any = await dbQuery(sql, [id]);

        if(result.length == 0) {
            return null;
        }

        return result[0].nr_id;
    }

    public static async update(id: number, nome: string, descricao: string): Promise<MeasureModel> | null {

        if(!descricao) {
            descricao = null;
        }

        const sql: string = 'UPDATE unidade_medida SET ds_nome = $1, ds_descricao = $2, dt_data_atualizacao = NOW() WHERE nr_id = $3 RETURNING nr_id, ds_nome, ds_descricao, dt_data_criacao, dt_data_atualizacao;';
        const result: any = await dbQuery(sql, [nome, descricao, id]);

        if(result.length == 0) {
            return null;
        }

        const row = result[0];
        const measure = new MeasureModel();

        measure.id = row.nr_id;
        measure.nome = row.ds_nome;
        measure.descricao = descricao;
        measure.dataCriacao = row.dt_criacao;
        measure.dataAtualizacao = row.dt_data_atualizacao;

        return measure;
    }
}