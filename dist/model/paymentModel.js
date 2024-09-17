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
exports.PaymentModel = void 0;
const database_1 = require("./database");
class PaymentModel {
    constructor() {
        this.id = 0;
        this.nome = '';
        this.descricao = '';
        this.tipo = '';
        this.status = true;
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
    getTipo() {
        return this.tipo;
    }
    getStatus() {
        return this.status;
    }
    getDataAtualizacao() {
        return this.dataAtualizacao;
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
    setTipo(tipo) {
        this.tipo = tipo;
    }
    setStatus(status) {
        this.status = status;
    }
    setDataAtualizacao(dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
    static create(nome, descricao, tipo_pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!descricao) {
                descricao = null;
            }
            const sql = 'INSERT INTO formas_pagamento (ds_nome, ds_descricao, ds_tipo_pagamento) VALUES ($1, $2, $3) RETURNING nr_id, dt_data_atualizacao;';
            const result = yield (0, database_1.dbQuery)(sql, [nome, descricao, tipo_pagamento]);
            if (result.length == 0 && !result[0].nr_id) {
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
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM formas_pagamento;';
            const result = yield (0, database_1.dbQuery)(sql);
            if (result.length == 0) {
                return [];
            }
            return result.map((row) => {
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
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM formas_pagamento WHERE nr_id = $1 RETURNING nr_id;';
            const result = yield (0, database_1.dbQuery)(sql, [id]);
            if (result.length == 0) {
                return null;
            }
            return result[0].nr_id;
        });
    }
    static update(id, nome, descricao, tipo_pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!descricao) {
                descricao = null;
            }
            const sql = 'UPDATE formas_pagamento SET ds_nome = $1, ds_descricao = $2, ds_tipo_pagamento = $3, dt_data_atualizacao = NOW() WHERE nr_id = $4 RETURNING nr_id, ds_nome, ds_descricao, ds_tipo_pagamento, nr_status, dt_criacao, dt_data_atualizacao;';
            const result = yield (0, database_1.dbQuery)(sql, [nome, descricao, tipo_pagamento, id]);
            if (result.length == 0) {
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
        });
    }
}
exports.PaymentModel = PaymentModel;
