import { Request, Response } from 'express';

class UserController {
    private users = [
        {username: 'juca@bala.com.br', password: '123'}
    ];

    public loginUser(req: Request, res: Response): void {
        const {username, password} = req.body;

        const user = this.users.find(user => user.username === username && user.password === password);

        if(!user) {
            res.status(200).json({message: 'Usuário ou senha inválidos'});
            return;
        }

        res.status(200).json({message: 'Login bem-sucedido', user: user.username});
    }
}

export const userController = new UserController();