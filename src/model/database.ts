import { Client } from 'pg';
console.log('conexão');

export const client: Client = new Client({
    user: 'postgres.eszqpneedjlxzchraghi',
    password: '@Celo%M201620',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres'
});

client.connect();

export async function dbQuery(sql: string, values?:any[]): Promise<any> {
    try{
        let result = await client.query(sql, values);

        return result.rows;
    } catch(e){
        console.error('Erro ao executar query:', e);
    }
}