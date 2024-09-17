import { client, dbQuery} from './database';

export class UserModel {
    private id: number = 0;
    private username: string = '';
    private email: string = '';
    private telefone: string = '';
    private dataNascimento: Date = new Date();
    private status: boolean = true;
    private tipo: string = '';

    public getId(): number {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    public isStatus(): boolean {
        return this.status;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    public setStatus(status: boolean): void {
        this.status = status;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }

    public static async findByUsername(username: string, password: string): Promise<UserModel | null> {

        const sql: string = 'SELECT * FROM usuarios WHERE ds_telefone = $1 AND ds_senha = $2 LIMIT 1;';
        const result: any = await dbQuery(sql, [username, password]);

        if(result.length == 0) {
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
    }
}