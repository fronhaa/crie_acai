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
exports.dbQuery = exports.client = void 0;
const pg_1 = require("pg");
console.log('conexão');
exports.client = new pg_1.Client({
    user: 'postgres.eszqpneedjlxzchraghi',
    password: '@Celo%M201620',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres'
});
exports.client.connect();
function dbQuery(sql, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield exports.client.query(sql, values);
            return result.rows;
        }
        catch (e) {
            console.error('Erro ao executar query:', e);
        }
    });
}
exports.dbQuery = dbQuery;
