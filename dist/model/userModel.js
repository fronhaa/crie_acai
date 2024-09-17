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
exports.UserModel = void 0;
const database_1 = require("./database");
class UserModel {
    constructor() {
        this.id = 0;
        this.username = '';
        this.email = '';
        this.telefone = '';
        this.dataNascimento = new Date();
        this.status = true;
        this.tipo = '';
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getTelefone() {
        return this.telefone;
    }
    getDataNascimento() {
        return this.dataNascimento;
    }
    isStatus() {
        return this.status;
    }
    getTipo() {
        return this.tipo;
    }
    setId(id) {
        this.id = id;
    }
    setUsername(username) {
        this.username = username;
    }
    setEmail(email) {
        this.email = email;
    }
    setTelefone(telefone) {
        this.telefone = telefone;
    }
    setDataNascimento(dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    setStatus(status) {
        this.status = status;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    static findByUsername(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM usuarios WHERE ds_telefone = $1 AND ds_senha = $2 LIMIT 1;';
            const result = yield (0, database_1.dbQuery)(sql, [username, password]);
            if (result.length == 0) {
                return null;
            }
            const userFromDb = result[0];
            const user = new UserModel();
            user.id = userFromDb.nr_id;
            user.username = userFromDb.ds_nome;
            user.email = userFromDb.ds_email;
            user.telefone = userFromDb.ds_telefone;
            user.dataNascimento = userFromDb.dt_data_nascimento;
            user.status = userFromDb.nr_status;
            user.tipo = userFromDb.ds_tipo;
            return user;
        });
    }
}
exports.UserModel = UserModel;
