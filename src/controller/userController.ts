import { Request, Response } from 'express';
import { UserModel } from '../model/userModel';

class UserController {

    public async loginUser(req: Request, res: Response): Promise<void> {

        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Usuário e senha são obrigatórios', erro: true});
            return;
        }

        const user: UserModel | null = await UserModel.findByUsername(username, password);

        if (!user) {
            res.status(401).json({ message: 'Usuário ou senha inválidos', erro: true});
            return;
        }

        res.status(200).json({message: 'Login bem-sucedido', profile: user});
    }
}

export const userController = new UserController();