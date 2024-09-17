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
exports.MeasureModel = void 0;
const database_1 = require("./database");
class MeasureModel {
    constructor() {
        this.id = 0;
        this.nome = '';
        this.descricao = '';
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getDescricao() {
        return this.descricao;
    }
    getDataAtualizacao() {
        return this.dataAtualizacao;
    }
    getDataCriacao() {
        return this.dataCriacao;
    }
    setId(id) {
        this.id = id;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }
    setDataAtualizacao(dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
    setDataCriacao(dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    static create(nome, descricao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!descricao) {
                descricao = null;
            }
            const sql = 'INSERT INTO unidade_medida (ds_nome, ds_descricao) VALUES ($1, $2) RETURNING nr_id, dt_data_criacao, dt_data_atualizacao;';
            const result = yield (0, database_1.dbQuery)(sql, [nome, descricao]);
            if (result.length == 0 && !result[0].nr_id) {
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
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM unidade_medida;';
            const result = yield (0, database_1.dbQuery)(sql);
            if (result.length == 0) {
                return [];
            }
            return result.map((row) => {
                const measure = new MeasureModel();
                measure.id = row.nr_id;
                measure.nome = row.ds_nome;
                measure.descricao = row.ds_descricao;
                measure.dataCriacao = row.dt_data_criacao;
                measure.dataAtualizacao = row.dt_data_atualizacao;
                return measure;
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM unidade_medida WHERE nr_id = $1 RETURNING nr_id;';
            const result = yield (0, database_1.dbQuery)(sql, [id]);
            if (result.length == 0) {
                return null;
            }
            return result[0].nr_id;
        });
    }
    static update(id, nome, descricao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!descricao) {
                descricao = null;
            }
            const sql = 'UPDATE unidade_medida SET ds_nome = $1, ds_descricao = $2, dt_data_atualizacao = NOW() WHERE nr_id = $3 RETURNING nr_id, ds_nome, ds_descricao, dt_data_criacao, dt_data_atualizacao;';
            const result = yield (0, database_1.dbQuery)(sql, [nome, descricao, id]);
            if (result.length == 0) {
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
        });
    }
}
exports.MeasureModel = MeasureModel;
